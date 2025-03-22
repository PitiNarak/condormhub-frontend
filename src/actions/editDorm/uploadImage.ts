'use server';

export async function uploadImage(
  file: File,
  dormId: string,
  access_token: string
) {
  const formData = new FormData();

  formData.append('image', file);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/dorms/${dormId}/images`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    if (error instanceof Response) {
      const errorMessage = await error.json();
      return errorMessage;
    } else {
      console.error('Unexpected error:', error);
    }
  }
}
