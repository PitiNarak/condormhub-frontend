'use server';

import { revalidateTag } from 'next/cache';

export async function uploadStudentImage(file: File, access_token: string) {
  const formData = new FormData();

  formData.append('image', file);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/user/studentEvidence`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const result = await response.json();

    if (response.ok) {
      revalidateTag('student-evidence');
      console.log('Image Uploaded: ', result.data.url);
      return result.data; // { expired: 'string', url: 'string' }
    } else {
      return { error: result.error || 'An unknown error occurred.' };
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return { error: 'An unexpected error occurred.' };
  }
}
