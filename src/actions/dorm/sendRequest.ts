'use server';
import client from '@/api';
import { auth } from '@/lib/auth';
import { revalidateTag } from 'next/cache';

export const sendRequest = async (dormId: string, message: string) => {
  const session = await auth();
  const res = await client.POST('/request/{id}', {
    params: {
      path: { id: dormId },
    },
    body: {
      message: message,
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
  revalidateTag('dorm-details');

  if (res.error) {
    return {
      error: res.error.error,
    };
  }
  return res.data;
};
