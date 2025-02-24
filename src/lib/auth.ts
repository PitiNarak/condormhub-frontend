import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getServerSession, NextAuthOptions, User } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';

declare module 'next-auth' {
  interface Session {
    user: {
      createAt: string;
      email: string;
      filledPersonalInfo: boolean;
      firstname: string;
      gender: string;
      id: string;
      isStudentVerified: boolean;
      isVerified: boolean;
      lastname: string;
      lifestyle1: string;
      lifestyle2: string;
      lifestyle3: string;
      nationalID: string;
      role: string;
      studentEvidence: string;
      updateAt: string;
      username: string;
    };
    access_token?: string;
    refresh_token?: string;
    access_token_expired?: number;
  }
  interface User {
    createAt: string;
    email: string;
    filledPersonalInfo: boolean;
    firstname: string;
    gender: string;
    id: string;
    isStudentVerified: boolean;
    isVerified: boolean;
    lastname: string;
    lifestyle1: string;
    lifestyle2: string;
    lifestyle3: string;
    nationalID: string;
    role: string;
    studentEvidence: string;
    updateAt: string;
    username: string;
    access_token?: string;
    refresh_token?: string;
    access_token_expired?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    access_token?: string;
    refresh_token?: string;
    access_token_expired?: number;
    user: User;
  }
}

export const nextAuthConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@condormhub.xyz',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/auth/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );
          const d = await response.json();
          const data = d.data;
          const decode = jwtDecode(data.accessToken);
          if (d.success) {
            return {
              access_token: data.accessToken,
              refresh_token: data.refreshToken,
              access_token_expired: decode.exp,
              ...data.userInformation,
            };
          } else {
            console.log(response.status);
            throw new Error(d.message);
          }
        } catch (e) {
          throw new Error(
            e instanceof Error ? e.message : 'An unknown error occurred'
          );
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const {
          access_token,
          refresh_token,
          access_token_expired,
          ...profile
        } = user;
        token.user = profile;
        token.access_token = access_token;
        token.refresh_token = refresh_token;
        token.access_token_expired = access_token_expired;
      }

      if (
        token.access_token_expired &&
        token.access_token_expired < Date.now()
      ) {
        try {
          const refreshed = await fetch(
            `${process.env.BACKEND_URL}/auth/refresh`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                refreshToken: token.refresh_token,
              }),
            }
          );
          const refresh = await refreshed.json();
          const decode = jwtDecode(refresh.data.accessToken);
          if (refresh.success) {
            token.access_token = refresh.data.accessToken;
            token.refresh_token = refresh.data.refreshToken;
            token.access_token_expired = decode.exp;
          } else {
            console.log(token.refresh_token);
            console.log(refresh.status);
            throw new Error(refresh.message);
          }
        } catch (e) {
          throw new Error(
            e instanceof Error ? e.message : 'An unknown error occurred'
          );
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (!token) return {} as typeof session;
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      session.access_token_expired = token.access_token_expired;
      session.user = token.user;
      return session;
    },
  },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, nextAuthConfig);
}
