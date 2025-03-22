'use server';

import client from '@/api';

interface Values {
  bedroom: number;
  bathroom: number;
  size: number;
  price: number;
  description: string;
}
export const updateDorm = async (
  values: Values,
  dormID: string | undefined,
  access_token: string
) => {
  if (dormID) {
    const res = await client.PATCH('/dorms/{id}', {
      params: {
        path: { id: dormID },
      },
      body: {
        bathrooms: values.bathroom,
        bedrooms: values.bedroom,
        size: values.size,
        description: values.description,
        price: values.price,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (res.error) {
      return {
        error: res.error.error,
      };
    }
  }
};
