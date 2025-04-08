'use server';

import client from '@/api';
import { auth } from '@/lib/auth';

export async function getMyHistory(page: number = 1, limit: number = 10) {
  // Make API call with query parameters
  const session = await auth();
  const { data, error } = await client.GET('/history/me', {
    params: {
      query: {
        page,
        limit,
      },
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
  if (error || !data.data) {
    return {
      message: error?.error,
      pagination: {
        current_page: 1,
        last_page: 1,
        limit: 10,
        total: 2,
      },
    };
  }
  return data;
}
