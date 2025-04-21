'use server';

import client from '@/api';
import { auth } from '@/lib/auth';

export async function getProfileByID(ID: string) {
  const session = await auth();
  const { data, error } = await client.GET('/user/{id}', {
    params: {
      path: {
        id: ID,
      },
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
  if (error || !data.data) {
    return {
      message: error?.error,
    };
  }
  return data.data;
}
