'use server';

import client from '@/api';
import { auth } from '@/lib/auth';

export async function getContract(page = 1, limit = 20) {
  try {
    const session = await auth();
    const access_token = session?.access_token;
    if (!access_token) {
      throw new Error('no session');
    }

    const { data, error } = await client.GET('/contract', {
      params: { query: { limit, page } },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    if (error) {
      throw new Error(error.error);
    }
    return { data };
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }
    return {
      error: 'unknown error',
    };
  }
}
