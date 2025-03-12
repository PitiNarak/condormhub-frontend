'use server';

import client from '@/api';

export async function fetchProperty(
  page: number,
  limit = 12
): Promise<{
  message?: string;
} | void> {
  const { data, error } = await client.GET('/dorms', {
    params: {
      query: { limit: limit, page: page },
    },
  });
  if (error || !data.data) {
    return {
      message: error?.error,
    };
  }
}
