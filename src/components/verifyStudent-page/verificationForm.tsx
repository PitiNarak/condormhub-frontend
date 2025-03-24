'use client';

import { uploadStudentImage } from '@/actions/studentVerification/uploadStudentImage';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  image: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      'Image is required'
    ),
});

export const VerificationForm = ({
  access_token,
}: {
  access_token: string;
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(value: z.infer<typeof formSchema>) {
    if (value.image[0].size > 20 * 1024 * 1024) {
      setError('File exceeds 20MB limit');
      return;
    }

    const res = await uploadStudentImage(value.image[0], access_token);

    if (res?.error) {
      setError(res.error);
    } else {
      setUploadedImage(null);
      form.reset();
      toast({ title: 'Success', description: 'Upload successful!' });
      router.push('/');
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) {
      form.setValue('image', e.target.files, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="w-full flex flex-col gap-4"
        >
          {uploadedImage ? (
            <Image
              src={uploadedImage}
              alt="Uploaded Image"
              width={400}
              height={400}
            />
          ) : (
            <p>No image uploaded yet.</p>
          )}

          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
