'use server';

import { auth } from '@/lib/auth';

export async function uploadReviewImage(file: File, historyId: string) {
  const formData = new FormData();

  formData.append('image', file);
  const session = await auth();

  try {
    await fetch(
      `${process.env.BACKEND_URL}/history/${historyId}/review/image`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
  } catch (error) {
    if (error instanceof Response) {
      const errorMessage = await error.json();
      return errorMessage;
    } else {
      console.error('Unexpected error:', error);
    }
  }
}
