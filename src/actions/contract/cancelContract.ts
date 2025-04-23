'use server';

import client from '@/api';
import { auth } from '@/lib/auth';

export async function acceptContract(contractID: string) {
  const session = await auth();
  const res = await client.PATCH('/contract/{contractID}/cancel', {
    params: {
      path: {
        contractID: contractID,
      },
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
  if (res.error || !res.data) {
    return {
      message: res.error,
    };
  }
  return;
}
