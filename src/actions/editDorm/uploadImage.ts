'use server';

import { revalidateTag } from 'next/cache';

export async function uploadImage(
  file: File,
  dormId: string,
  access_token: string
) {
  const formData = new FormData();

  formData.append('image', file);

  try {
    await fetch(`${process.env.BACKEND_URL}/dorms/${dormId}/images`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    revalidateTag('dorm-details');
  } catch (error) {
    if (error instanceof Response) {
      const errorMessage = await error.json();
      return errorMessage;
    } else {
      console.error('Unexpected error:', error);
    }
  }
}
