'use server';

import client from '@/api';

interface Values {
  name: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  price: number;
  description: string;
  subdistrict: string;
  district: string;
  province: string;
  zipcode: string;
}

export async function sendDormRegistration(
  value: Values,
  access_token: string
) {
  const { data, error } = await client.POST('/dorms', {
    body: {
      address: {
        subdistrict: value.subdistrict,
        district: value.district,
        province: value.province,
        zipcode: value.zipcode,
      },
      bathrooms: value.bathrooms,
      bedrooms: value.bedrooms,
      size: value.size,
      description: value.description,
      price: value.price,
      name: value.name,
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (error || !data.data) {
    return {
      message: error?.error,
    };
  }
  return data;
}
