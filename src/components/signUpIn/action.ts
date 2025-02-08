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

    const response = await fetch('#', {
      method: 'POST',
      body: JSON.stringify(objectUser),
    });
    // Handle response if necessary
    const data = await response.json();
    console.log(data);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { message: e.message };
    } else {
      return { message: 'unknown error' };
    }
  }
};
