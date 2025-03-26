'use client';

import React, { useState } from 'react';
import { ImageBox } from '@/components/registerDorm-page/dormImage';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/navigation';
import { DormRegisterForm } from '@/components/registerDorm-page/dormRegisterForm';

const formSchema = z.object({
  name: z.string().min(5).max(100),
  price: z.number().min(1000),
  size: z.number().min(1).max(50),
  description: z.string().min(10).max(500),
  bedrooms: z.number().min(1),
  bathrooms: z.number().min(1),
  district: z.string().min(1).max(50),
  province: z.string().min(1).max(50),
  subdistrict: z.string().min(1).max(50),
  zipcode: z.string().length(5),
});

export const DormRegisterBox = () => {
  const [images, setImages] = useState<string[]>([]);
  //   const router = useRouter();
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
  //   const [isLoad, setLoad] = useState(false);
  //   const [err, setErr] = useState('');

  //   async function onSubmit(values: z.infer<typeof formSchema>) {
  //     setLoad(true);
  //     try {
  //       const result = await sendRegistration(values);
  //       setErr('');
  //       if (result && result.message !== 'user successfully registered') {
  //         //Tell user why
  //         setErr(result.message ? result.message : '');
  //       } else {
  //         //Redirect to email verification
  //         router.push('/emailVerification');
  //       }
  //     } catch (e: unknown) {
  //       console.log(e);
  //     }
  //     setLoad(false);
  //   }

  return (
    <div>
      <div>
        <ImageBox images={images} setImages={setImages} />
      </div>
      <DormRegisterForm form={form} />
    </div>
  );
};
