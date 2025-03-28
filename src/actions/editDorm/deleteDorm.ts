'use server';

import client from '@/api';
import { auth } from '@/lib/auth';

export const deleteDorm = async (dormId: string) => {
  const session = await auth();
  const res = await client.DELETE('/dorms/{id}', {
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
};
