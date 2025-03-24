'use server';
import client from '@/api';
import { auth } from '@/lib/auth';

export const sendRequest = async (dormId: string) => {
  const session = await auth();
  const res = await client.POST('/request/{id}', {
    params: {
      path: { id: dormId },
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  if (res.error) {
    return {
      error: res.error.error,
    };
  }
  return res.data;
};
