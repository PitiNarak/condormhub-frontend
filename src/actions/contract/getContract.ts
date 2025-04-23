'use server';

import client from '@/api';
import { auth } from '@/lib/auth';

export async function acceptContract() {
  const session = await auth();
  const res = await client.GET('/contract', {
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
  if (res.error || !res.data) {
    return {
      message: res.error,
    };
  }
  return res.data;
}
