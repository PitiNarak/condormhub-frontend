'use client';

import { uploadStudentImage } from '@/actions/verifyStudent/uploadStudentImage';
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
import { CircleCheckBig } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      toast({
        description: (
          <div className="flex gap-5">
            <CircleCheckBig className="text-green-500" />
            <p className="text-base">Image uploaded successfully</p>
          </div>
        ),
      });
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
    <div className="flex flex-col gap-6 items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="w-full flex flex-col gap-4"
        >
          <div
            className="relative w-[450px] h-[300px] border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={() => uploadedImage && setIsDialogOpen(true)}
          >
            {uploadedImage ? (
              <Image
                src={uploadedImage}
                alt="Uploaded Image"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <p>No image uploaded yet.</p>
            )}
          </div>

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

          <div className="flex gap-4 justify-center">
            <Button
              className="p-4"
              type="button"
              variant="outline"
              onClick={() => router.push('/')}
            >
              Skip
            </Button>
            <Button className="p-4" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-[90vw] h-[90vh] p-4 flex items-center justify-center">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-full">
            {uploadedImage && (
              <Image
                src={uploadedImage}
                alt="Full Image"
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
