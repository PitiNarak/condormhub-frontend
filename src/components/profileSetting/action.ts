'use server';

export const getUserInformation = async (access_token: string) => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/user/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    });

    const d = await response.json();
    const data = d.data;
    console.log(data);
    if (d.success) {
      return { data };
    }
  } catch (e) {
    if (e instanceof Error) {
      return { message: e.message };
    } else {
      return { message: 'unknown error' };
    }
  }
};
