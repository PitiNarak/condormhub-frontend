'use server';

import client from '@/api';
import { auth } from '@/lib/auth';

export async function DeleteReview(historyId: string) {
  const session = await auth();
  const res = await client.DELETE('/history/{id}/review', {
    params: {
      path: {
        id: historyId,
      },
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
}
