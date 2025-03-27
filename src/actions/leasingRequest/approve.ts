'use server';

import client from '@/api';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function approve(id: string) {
  try {
    const session = await auth();
    const access_token = session?.access_token;
    if (!access_token) {
      throw new Error('no session');
    }

    const { data, error } = await client.PATCH('/request/{id}/approve', {
      params: { path: { id } },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (error) {
      throw new Error(error.error);
    }

    revalidatePath(`/leasingRequest`);

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
