'use server';

import client from '@/api';

export async function fetchProperty(page: number, limit = 12) {
  const { data, error } = await client.GET('/dorms', {
    params: {
      query: { limit: limit, page: page },
    },
  });
  // return {message: "backend crash :V"}
  if (error || !data.data) {
    return {
      message: error?.error,
      pagination: { current_page: 1, last_page: 1, limit: 12, total: 2 },
    };
  }
  return data;
}
