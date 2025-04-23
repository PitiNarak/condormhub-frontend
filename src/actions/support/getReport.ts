'use server';
import client from '@/api';
import { auth } from '@/lib/auth';

export async function getReport(page: number = 1, limit: number = 20) {
  const session = await auth();
  const { data, error } = await client.GET('/support', {
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
