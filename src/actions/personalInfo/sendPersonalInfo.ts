'use server';

import client from '@/api';
import { components } from '@/types/api';

export async function sendPersonalInfo(
  access_token: string,
  formData: components['schemas']['dto.UserInformationRequestBody']
) {
  const { data, error } = await client.PATCH('/user', {
    body: formData,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (error || !data.data) {
    return {
      message: error?.error,
    };
  }
}
