'use server';

import client from '@/api';

interface dorms {
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

export async function sendDormRegistration(dorms: dorms, access_token: string) {
  const { data, error } = await client.POST('/dorms', {
    body: {
      address: {
        subdistrict: dorms.subdistrict,
        district: dorms.district,
        province: dorms.province,
        zipcode: dorms.zipcode,
      },
      bathrooms: dorms.bathrooms,
      bedrooms: dorms.bedrooms,
      size: dorms.size,
      description: dorms.description,
      price: dorms.price,
      name: dorms.name,
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
