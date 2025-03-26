import client from '@/api';
import { auth } from '@/lib/auth';

export const getRequests = async (page: number) => {
  const session = await auth();
  const res = await client.GET('/request/me', {
    params: {
      query: {
        limit: 50,
        page: page,
      },
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
  if (res.error) {
    return {
      error: res.error?.error,
    };
  }
  return res.data;
};
