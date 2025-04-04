'use server';

import client from '@/api';

export async function getProfileByID(lesseeID: string) {
  const { data, error } = await client.GET('/user/{id}', {
    params: {
      path: {
        id: lesseeID,
      },
    },
  });
  if (error || !data.data) {
    return {
      message: error?.error,
    };
  }
  return data.data;
}
