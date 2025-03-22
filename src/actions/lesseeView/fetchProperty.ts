'use server';

import client from '@/api';

type QueryParams = {
  page: number;
  limit: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  district?: string;
  subdistrict?: string;
  province?: string;
  zipcode?: string;
};

export async function fetchProperty(
  page: number,
  limit = 12,
  searchParams?: {
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    district?: string;
    subdistrict?: string;
    province?: string;
    zipcode?: string;
  }
) {
  console.log('Search Params', searchParams);

  // Prepare query parameters
  const queryParams: QueryParams = {
    limit,
    page,
  };

  // Add search parameters if they exist
  if (searchParams) {
    if (searchParams.search) queryParams.search = searchParams.search;
    if (searchParams.minPrice)
      queryParams.minPrice = parseInt(searchParams.minPrice);
    if (searchParams.maxPrice)
      queryParams.maxPrice = parseInt(searchParams.maxPrice);
    if (searchParams.district) queryParams.district = searchParams.district;
    if (searchParams.subdistrict)
      queryParams.subdistrict = searchParams.subdistrict;
    if (searchParams.province) queryParams.province = searchParams.province;
    if (searchParams.zipcode) queryParams.zipcode = searchParams.zipcode;
  }

  // Make API call with query parameters
  const { data, error } = await client.GET('/dorms', {
    params: {
      query: queryParams,
    },
  });

  console.log('Query', queryParams);

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
