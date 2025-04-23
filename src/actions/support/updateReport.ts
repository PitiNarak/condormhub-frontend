'use server';

import client from '@/api';
import { auth } from '@/lib/auth';

export const updateDorm = async (reportID: string, newStatus: string) => {
  const session = await auth();
  const res = await client.PATCH('/support/{id}', {
    params: {
      path: { id: reportID },
    },
    body: {
      status: newStatus,
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
  if (res.error) {
    return {
      error: res.error.error,
    };
  }
};
