'use server';

import client from '@/api';

export const verifyEmail = async (token: string) => {
  const { data, error } = await client.POST('/user/verify', {
    body: { token },
  });

  if (error) {
    throw {
      error: error.error,
    };
  }

  return data.data;
};
