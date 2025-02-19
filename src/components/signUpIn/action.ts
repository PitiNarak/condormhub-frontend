'use server';

export interface user {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const sendRegistration = async (
  objectUser: user
): Promise<{ message: string } | void> => {
  try {
    if (objectUser.username.startsWith(' ')) {
      throw new Error('TEST ERROR ' + Date.now());
    }

    const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        email: objectUser.email,
        username: objectUser.username,
        password: objectUser.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Handle response if necessary
    const data = await response.json();
    if (!data.success) {
      return { message: data.message };
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { message: e.message };
    } else {
      return { message: 'unknown error' };
    }
  }
};
