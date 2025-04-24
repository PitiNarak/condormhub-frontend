'use server';

import client from '@/api';
import { auth } from '@/lib/auth';

export async function createTransaction(id: string) {
  const session = await auth();
  if (!session?.access_token)
    return {
      message: 'no session',
    };

  const { data, error } = await client.POST('/transaction', {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
    body: {
      orderID: id,
    },
  });
  if (error || !data.data) {
    return {
      message: error?.error,
    };
  }

  return data.data;
}
