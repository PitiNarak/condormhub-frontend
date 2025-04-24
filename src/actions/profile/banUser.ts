'use server';
import client from '@/api';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function banUser(id: string) {
  try {
    const session = await auth();
    const { data, error } = await client.PATCH('/admin/user/{id}/ban', {
      params: { path: { id } },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    if (error) {
      throw new Error(error.error);
    }
    console.log(data);
    revalidatePath(`/profile/${id}`);
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
