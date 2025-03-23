'use server';

import client from '@/api';
import { components } from '@/types/api';

export async function sendPersonalInfo(
  access_token: string,
  formData: components['schemas']['dto.UserInformationRequestBody']
) {
  const date: Date = new Date(formData.birthDate ?? '2000-01-01');
  formData['birthDate'] = date.toISOString();
  console.log(formData);
  const { data, error } = await client.PATCH('/user', {
    body: formData,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  console.log(data);
  if (error || !data.data) {
    return {
      message: error?.error,
    };
  }
}
