'use client';

import React, { useState } from 'react';
import { uploadImage } from '@/actions/editDorm/uploadImage';
import { ImageBox } from '@/components/registerDorm-page/dormImage';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DormRegisterForm } from '@/components/registerDorm-page/dormRegisterForm';
import { sendDormRegistration } from '@/actions/dorm/createDorm';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(5).max(100),
  price: z.coerce
    .number({
      invalid_type_error: 'Must be a number',
    })
    .min(1000),
  size: z.coerce
    .number({
      invalid_type_error: 'Must be a number',
    })
    .min(1),
  description: z.string().min(10).max(500),
  bedrooms: z.coerce
    .number({
      invalid_type_error: 'Must be a number',
    })
    .min(1),
  bathrooms: z.coerce
    .number({
      invalid_type_error: 'Must be a number',
    })
    .min(1),
  district: z.string().min(1).max(50),
  province: z.string().min(1).max(50),
  subdistrict: z.string().min(1).max(50),
  zipcode: z.string().length(5),
});

interface Session {
  access_token: string;
}

export const DormRegisterBox: React.FC<Session> = ({ access_token }) => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 1000,
      size: 1,
      description: '',
      bedrooms: 1,
      bathrooms: 1,
      district: '',
      province: '',
      subdistrict: '',
      zipcode: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await sendDormRegistration(values);
      if (!res || !('data' in res) || !res.data) {
        console.error('Cannot create dorm');
        return;
      }
      if (res.data.id) {
        for (const imageUrl of images) {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const file = new File([blob], 'image.jpg', { type: blob.type });
          await uploadImage(file, res.data.id, access_token);
        }
        router.push('/dorm/' + res.data.id);
      } else {
        console.error('internal error');
      }
    } catch (e: unknown) {
      console.log(e);
    }
  }

  return (
    <div>
      <div>
        <ImageBox images={images} setImages={setImages} />
      </div>
      <DormRegisterForm form={form} />
      <div className="p-3">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-4xl mx-auto pt-0 "
        >
          <button
            type="submit"
            className="max-w-base w-full flex justify-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-800 transition"
          >
            <span className="text-lg font-semibold">Submit</span>
          </button>
        </form>
      </div>
    </div>
  );
};
