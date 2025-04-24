'use server';

import client from '@/api';
import { auth } from '@/lib/auth';

export async function getUnpaidOrder(page = 1, limit = 10) {
  const session = await auth();
  if (!session?.access_token)
    return {
      message: 'no session',
    };

  const { data, error } = await client.GET('/order/unpaid/me', {
    params: {
      query: { page, limit },
    },
  });
  if (error || !data.data) {
    return {
      message: error?.error,
    };
  }

  return data.data;
}
