'use server';

export const getStudentEvidence = async (id: string, access_token: string) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/user/${id}/studentEvidence`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const res = await response.json();

    if (!response.ok) {
      return { error: res.error || 'An unknown error occurred.' };
    }

    return res.data; // { expired: 'string', url: 'string' }
  } catch (error) {
    console.error('Unexpected error:', error);
    return { error: 'An unexpected error occurred.' };
  }
};
