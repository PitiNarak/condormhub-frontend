'use server';

import client from '@/api';
import { auth } from '@/lib/auth';

export async function reject(id: string) {
  try {
    const session = await auth();
    const access_token = session?.access_token;
    if (!access_token) {
      throw new Error('no session');
    }

    const { data, error } = await client.PATCH('/request/{id}/reject', {
      params: { path: { id } },
      headers: {
        Authorization: `Bearer ${access_token}`,
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
