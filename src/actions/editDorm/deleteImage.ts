'use server';

import { revalidateTag } from 'next/cache';

export async function deleteImage(url: string, access_token: string) {
  const encodedUrl = encodeURIComponent(url);
  try {
    await fetch(`${process.env.BACKEND_URL}/dorms/images/${encodedUrl}`, {
      method: 'DELETE',
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
