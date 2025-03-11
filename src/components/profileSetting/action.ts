import client from '@/api';

export const DeleteAccount = async (access_token: string) => {
  const res = await client.DELETE('/user/', {
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
