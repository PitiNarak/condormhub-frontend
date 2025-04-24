'use server';

import client from '@/api';
import { auth } from '@/lib/auth';

export const rejectLessee = async (lesseeID: string) => {
  const session = await auth();
  const access_token = session?.access_token;

  if (!access_token) {
    throw new Error('no session');
  }

  const res = await client.PATCH('/admin/lessee/{id}/reject', {
    params: {
      path: { id: lesseeID },
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (res.error) {
    return {
      error: res.error.error,
    };
  }
};

export const verifyLessee = async (lesseeID: string) => {
  const session = await auth();
  const access_token = session?.access_token;

  if (!access_token) {
    throw new Error('no session');
  }

  const res = await client.PATCH('/admin/lessee/{id}/verify', {
    params: {
      path: { id: lesseeID },
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (res.error) {
    return {
      error: res.error.error,
    };
  }
};
