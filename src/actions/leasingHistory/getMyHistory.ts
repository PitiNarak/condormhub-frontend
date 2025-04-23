'use server';

import client from '@/api';
import { auth } from '@/lib/auth';

export async function GetMyHistory() {
  const session = await auth();
  const { data, error } = await client.GET('/history/me', {
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
