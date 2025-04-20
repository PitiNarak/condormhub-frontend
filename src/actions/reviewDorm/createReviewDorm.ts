'use server';

import client from '@/api';
import { auth } from '@/lib/auth';
import { revalidateTag } from 'next/cache';

interface Review {
  message: string;
  rate: number;
}

export async function CreateReview(historyId: string, review: Review) {
  const session = await auth();
  const { data, error } = await client.POST('/history/{id}/review', {
    params: {
      path: {
        id: historyId,
      },
    },
    body: {
      message: review.message,
      rate: review.rate,
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
  revalidateTag('dorm-details');
  if (error || !data.data) {
    return {
      error: error?.error || 'Unknown error',
    };
  }
  return data;
}
