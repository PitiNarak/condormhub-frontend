'use server';

import client from '@/api';

export async function getReview(access_token: string, dormId: string) {
  const { data, error } = await client.GET('/history/bydorm/{id}', {
    params: {
      path: {
        id: dormId,
      },
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (error || !data.data) {
    return {
      error: error?.error,
    };
  }
  return data;
}
