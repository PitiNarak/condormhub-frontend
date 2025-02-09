import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getServerSession, NextAuthOptions, User } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
    access_token?: string;
    refresh_token?: string;
    access_token_expired?: number;
  }
  interface User {
    access_token: string;
    refresh_token: string;
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

// Simulate an actual token refresh request
async function refreshToken() {
  return {
    access_token: 'NEW_ACCESS_TOKEN',
    refresh_token: 'NEW_REFRESH_TOKEN',
    access_token_expired: Date.now() + 3600 * 1000,
  };
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
        //waiting for backend implementation
        console.log(credentials);
        return {
          id: '1',
          name: 'John Doe',
          email: credentials.email || '',
          access_token: 'ACCESS_TOKEN',
          refresh_token: 'REFRESH_TOKEN',
          access_token_expired: Date.now() + 3600 * 1000,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
        token.access_token_expired = user.access_token_expired;
      }

      if (
        token.access_token_expired &&
        token.access_token_expired < Date.now()
      ) {
        const refreshed = await refreshToken();

        token.access_token = refreshed.access_token;
        token.refresh_token = refreshed.refresh_token;
        token.access_token_expired = refreshed.access_token_expired;
        token.user.access_token = refreshed.access_token;
        token.user.refresh_token = refreshed.refresh_token;
        token.user.access_token_expired = refreshed.access_token_expired;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      session.access_token_expired = token.access_token_expired;
      session.user.id = token.user.id;
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
