'use server';
import client from '@/api';
import { auth } from '@/lib/auth';

export async function report(message: string) {
  try {
    const session = await auth();
    const { data, error } = await client.POST('/support', {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: {
        message: message,
      },
    });
    if (error) {
      throw new Error(error.error);
    }
    console.log(data);
  } catch (err) {
    if (err instanceof Error) {
      return {
        error: err.message,
      };
    }
    return {
      error: 'unknown error',
    };
  }
}
