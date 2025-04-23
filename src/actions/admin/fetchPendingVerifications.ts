'use server';

import client from '@/api';
import { auth } from '@/lib/auth';

export async function fetchPendingVerifications(
  page: number = 1,
  limit: number = 10
) {
  const session = await auth();

  if (!session?.access_token) {
    return {
      message: 'No access token found',
      pagination: {
        current_page: 1,
        last_page: 1,
        limit,
        total: 0,
      },
    };
  }

  const { data, error } = await client.GET('/admin/lessee/pending', {
    params: {
      query: {
        page,
        limit,
      },
    },
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error || !data?.data) {
    return {
      message: error?.error || 'Error fetching pending users',
      pagination: {
        current_page: 1,
        last_page: 1,
        limit,
        total: 0,
      },
    };
  }

  return data;
}
