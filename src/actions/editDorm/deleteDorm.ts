'use server';

import client from '@/api';

export const deleteDorm = async (dormId: string, access_token: string) => {
  const res = await client.DELETE('/dorms/{id}', {
    params: {
      path: { id: dormId },
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
