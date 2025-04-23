'use server';

import client from '@/api';

export async function getReview(dormId: string) {
  const { data, error } = await client.GET('/history/bydorm/{id}/review', {
    params: {
      path: {
        id: dormId,
      },
    },
  });
  if (error || !data?.data) {
    return {
      error: error?.error,
    };
  }
  return data;
}
