'use server';

import client from '@/api';

export async function fetchProperty(
  page: number = 1,
  limit: number = 12,
  search?: string,
  minPrice?: number,
  maxPrice?: number,
  district?: string,
  subdistrict?: string,
  province?: string,
  zipcode?: string
) {
  // Make API call with query parameters
  const { data, error } = await client.GET('/dorms', {
    params: {
      query: {
        page,
        limit,
        search,
        minPrice,
        maxPrice,
        district,
        subdistrict,
        province,
        zipcode,
      },
    },
  });
  if (error || !data.data) {
    return {
      message: error?.error,
      pagination: {
        current_page: 1,
        last_page: 1,
        limit: 12,
        total: 2,
      },
    };
  }
  return data;
}
