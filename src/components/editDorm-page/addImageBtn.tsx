'use client';
import { uploadImage } from '@/actions/editDorm/uploadImage';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  image: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      'Image is required'
    ),
});

export const AddImageBtn = ({
  dormId,
  access_token,
}: {
  dormId: string;
  access_token: string;
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(value: z.infer<typeof formSchema>) {
    if (uploadedImage) {
      const res = await uploadImage(value.image[0], dormId, access_token);
      window.location.reload();
      if (res) {
        console.error('Upload failed:', res);
        setError(res);
      } else {
        setUploadedImage(null);
        setOpen(false);
        form.reset();
      }
    }
  }

  async function onCancel() {
    setUploadedImage(null);
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
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          form.reset(); // Reset form when dialog is closed
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-min">Add Image</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="w-full flex flex-col gap-4"
          >
            <DialogHeader className="gap-4">
              <DialogTitle className="w-min text-nowrap">
                Upload image
              </DialogTitle>
              {uploadedImage && (
                <Image
                  src={uploadedImage}
                  alt="Uploaded Image"
                  width={400}
                  height={400}
                />
              )}
              <DialogDescription className="text-left">
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
              </DialogDescription>
            </DialogHeader>
            {error && <p className="text-red-500">{error}</p>}
            <DialogFooter className="flex-col md:gap-1 gap-2">
              <Button type="submit">Confirm</Button>
              <DialogClose asChild>
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
