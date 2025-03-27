'use server';

import client from '@/api';
import { auth } from '@/lib/auth';
import { components } from '@/types/api';

export async function sendPersonalInfo(
  formData: components['schemas']['dto.UserInformationRequestBody']
) {
  const session = await auth();

  const date: Date = new Date(formData.birthDate ?? '2000-01-01');
  const nID: string = formData['nationalID'] ?? '';
  formData['nationalID'] = nID.replaceAll('-', '');
  formData['birthDate'] = date.toISOString();
  const { data, error } = await client.PATCH('/user', {
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
