'use server';

import client from '@/api';
import { auth } from '@/lib/auth';

interface Review {
  message: string;
  rate: number;
}

export async function EditReview(dormId: string, review: Review) {
  const session = await auth();
  const { data, error } = await client.PATCH('/history/review/{id}', {
    params: {
      path: {
        id: dormId,
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
  if (error || !data.data) {
    return {
      message: error?.error,
    };
  }
  return data;
}
