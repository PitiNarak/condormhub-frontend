import client from '@/api';
import { auth } from '@/lib/auth';

export const getRequestsByDormId = async (dormId: string) => {
  const session = await auth();
  const res = await client.GET('/request/bydorm/{id}', {
    params: {
      path: {
        id: dormId,
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
