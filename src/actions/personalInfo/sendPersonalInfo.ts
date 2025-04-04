'use server';

import client from '@/api';
import { auth } from '@/lib/auth';
import { components } from '@/types/api';

export async function sendPersonalInfo(
  formData: components['schemas']['dto.UserFirstFillRequestBody']
) {
  const session = await auth();

  const date: Date = new Date(formData.birthDate ?? '2000-01-01');
  const nID: string = formData['nationalID'] ?? '';
  formData['nationalID'] = nID.replaceAll('-', '');
  formData['birthDate'] = date.toISOString();
  console.log(formData);
  const { data, error } = await client.PATCH('/user/firstfill', {
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });
  if (error || !data.data) {
    return {
      message: error?.error,
    };
  }
}
