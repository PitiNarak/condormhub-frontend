'use server';

import client from '@/api';

export const UpdateLifestyleTags = async (
  access_token: string,
  lifestyles: string[]
) => {
  const res = await client.PATCH('/user', {
    body: {
      lifestyles: lifestyles,
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

  return res.data;
};

export const GetUserData = async (access_token: string) => {
  const res = await client.GET('/user/me', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (res.error) {
    return {
      error: res.error.error,
    };
  }

  return res.data;
};
