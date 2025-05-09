'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { uploadImage } from '@/actions/editDorm/uploadImage';
import { ImageBox } from '@/components/registerDorm-page/dormImage';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DormRegisterForm } from '@/components/registerDorm-page/dormRegisterForm';
import { sendDormRegistration } from '@/actions/dorm/createDorm';
import { redirect, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';

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

export default function DormRegisterBox() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmit, setisSubmit] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (images.length === 0) {
      return;
    }
    setisLoading(true);
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
          if (session?.access_token) {
            await uploadImage(file, res.data.id, session?.access_token);
          }
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
        <ImageBox images={images} setImages={setImages} isSubmit={isSubmit} />
      </div>
      <DormRegisterForm form={form} />
      {!isLoading ? (
        <div className="flex max-w-4xl mx-auto gap-2 pt-2">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Button
              type="submit"
              onClick={() => {
                setisSubmit(true);
              }}
            >
              Submit
            </Button>
          </form>

          <Button
            type="button"
            variant="destructive"
            onClick={() => redirect(`/`)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Loading className="flex max-w-4xl mx-auto gap-2 pt-2"></Loading>
      )}
    </div>
  );
}
