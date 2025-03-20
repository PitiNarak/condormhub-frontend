'use server';

import client from '@/api';

export const getDormByID = async (id: string) => {
  const res = await client.GET('/dorms/{id}', {
    params: {
      path: {
        id: id,
      },
    },
  });
  if (res.error) {
    return {
      error: res.error.error,
    };
  }
  return res.data.data;
};
