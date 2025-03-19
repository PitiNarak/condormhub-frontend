'use server';

import client from '@/api';

export interface user {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export async function sendRegistration(value: user): Promise<{
  message?: string;
} | void> {
  const { data, error } = await client.POST('/auth/register', {
    body: {
      email: value.email,
      username: value.username,
      password: value.password,
    },
  });
  if (error || !data.data) {
    return {
      message: error?.error,
    };
  }
}
