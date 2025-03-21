import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getServerSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { components } from '@/types/api';
import client from '@/api';
import { jwtDecode } from 'jwt-decode';

type LoginResponseType =
  components['schemas']['dto.TokenWithUserInformationResponseBody'];

declare module 'next-auth' {
  interface Session {
    user?: components['schemas']['dto.TokenWithUserInformationResponseBody']['userInformation'];
    access_token?: components['schemas']['dto.TokenWithUserInformationResponseBody']['accessToken'];
    refresh_token?: components['schemas']['dto.TokenWithUserInformationResponseBody']['refreshToken'];
    access_token_expired?: number;
  }

  interface User extends LoginResponseType {
    id?: string;
    error?: string;
    access_token_expired?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token?: components['schemas']['dto.TokenWithUserInformationResponseBody']['accessToken'];
    refresh_token?: components['schemas']['dto.TokenWithUserInformationResponseBody']['refreshToken'];
    access_token_expired?: number;
    user?: components['schemas']['dto.TokenWithUserInformationResponseBody']['userInformation'];
  }
}

// Simulate an actual token refresh request
async function refreshToken(refresh_token: string): Promise<{
  error?: string;
  accessToken?: string;
  refreshToken?: string;
}> {
  const { data, error } = await client.POST('/auth/refresh', {
    body: {
      refreshToken: refresh_token,
    },
  });

  if (error || !data.data) {
    return {
      error: 'refresh token error',
    };
  }

  return data.data;
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
        const res = await client.POST('/auth/login', {
          body: {
            email: credentials.email,
            password: credentials.password,
          },
        });

        if (res.error) {
          throw new Error(res.error.error);
        }

        if (!res.data.data) {
          throw new Error('An unknown error occurred.');
        }

        const decoded = jwtDecode(res.data.data.accessToken || '');
        return { ...res.data.data, access_token_expired: decoded.exp };
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === 'update' && session?.user) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.user = session.user;
      }
      if (user) {
        token.user = user.userInformation;
        token.access_token = user.accessToken;
        token.refresh_token = user.refreshToken;
        token.access_token_expired = user.access_token_expired;
      }

      // refresh before token is expire 5 mins
      if (
        token.access_token_expired &&
        (token.access_token_expired - 5 * 60) * 1000 < Date.now()
      ) {
        if (!token.refresh_token)
          return {
            error: 'refresh token not exits',
          };
        const refreshed = await refreshToken(token.refresh_token);
        if (refreshed.error) {
          return {
            error: refreshed.error,
          };
        }
        token.access_token = refreshed.accessToken;
        token.refresh_token = refreshed.refreshToken;
        const decoded = jwtDecode(refreshed.accessToken || '');
        token.access_token_expired = decoded.exp;
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
