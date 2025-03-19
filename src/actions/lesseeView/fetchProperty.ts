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
    };
  }
  return data.data;
}
