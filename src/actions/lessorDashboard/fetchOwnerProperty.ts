'use server';

import client from '@/api';

export async function fetchOwnerProperty(
  ownerId: string,
  page: number = 1,
  limit: number = 12
) {
  if (!ownerId) {
    return {
      message: 'Owner ID is required.',
      pagination: {
        current_page: 1,
        last_page: 1,
        limit: 12,
        total: 0,
      },
    };
  }

  try {
    // Make API call to fetch properties by owner ID
    const { data, error } = await client.GET('/dorms/owner/{id}', {
      params: {
        path: { id: ownerId },
        query: { page, limit },
      },
    });

    if (error || !data.data) {
      return {
        message: error?.error || 'An error occurred.',
        pagination: {
          current_page: 1,
          last_page: 1,
          limit: 12,
          total: 0,
        },
      };
    }
    return data;
  } catch (err) {
    return {
      message: `Unexpected error occurred. ${err}`,
      pagination: {
        current_page: 1,
        last_page: 1,
        limit: 12,
        total: 0,
      },
    };
  }
}
