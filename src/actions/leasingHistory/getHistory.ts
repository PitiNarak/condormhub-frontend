'use server';

import client from '@/api';
import { auth } from '@/lib/auth';

export async function GetHistory(historyId: string) {
  const session = await auth();
  const { data, error } = await client.GET('/history/{id}', {
    params: {
      path: {
        id: historyId,
      },
    },
    headers: {
      Authorization: `Bearer ${session!.access_token}`,
    },
  });
  if (error || !data) {
    return {
      error: error?.error,
    };
  }
  return data;
}
