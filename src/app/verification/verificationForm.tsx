'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import {
  verificationData,
  VerificationRecord,
} from '@/app/verification/mockData/testTable';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const formSchema = z.object({
  picture: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      'Image is required'
    ),
});

export default function VerificationForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [pendingRecord, setPendingRecord] = useState<VerificationRecord | null>(
    null
  );
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { picture: undefined },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) {
      form.setValue('picture', e.target.files, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);

    const file = values.picture[0];
    if (!file || file.size === 0) {
      setError('No file uploaded. Please select an image.');
      return;
    }

    const record: VerificationRecord = {
      id: crypto.randomUUID(), // Generate a unique ID for the verification record
      file,
    };

    setPendingRecord(record);
    setIsConfirmDialogOpen(true);
  }

  const handleConfirm = () => {
    if (pendingRecord) {
      verificationData.push(pendingRecord);
      console.log('New verification record:', pendingRecord);
      console.log('All verification records:', verificationData);
    }
    setIsConfirmDialogOpen(false);
    setPendingRecord(null);

    // router.push('/')
    router.refresh();
  };

  const handleCancel = () => {
    setIsConfirmDialogOpen(false);
    setPendingRecord(null);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-md p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-center mb-4">
              {/* Zoomed Image Dialog */}
              {previewImage ? (
                <Dialog
                  open={!!zoomedImage}
                  onOpenChange={(open) => {
                    if (!open) setZoomedImage(null);
                  }}
                >
                  <DialogTrigger asChild>
                    <div className="cursor-pointer w-full h-64 relative">
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fill
                        className="object-cover rounded-lg"
                        onClick={() => setZoomedImage(previewImage)}
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="p-4">
                    <DialogTitle>Your Student Verification</DialogTitle>
                    {zoomedImage && (
                      <Image
                        src={zoomedImage}
                        alt="Zoomed Image"
                        width={900}
                        height={900}
                        className="object-contain rounded-lg"
                      />
                    )}
                    <div className="mt-4 flex justify-end">
                      <Button onClick={() => setZoomedImage(null)}>
                        Close
                      </Button>
                    </div>
                  </DialogContent>
                  <DialogDescription></DialogDescription>
                </Dialog>
              ) : (
                <div className="w-full h-64 bg-white border border-gray-300 rounded-lg flex items-center justify-center">
                  Your Student Verification
                </div>
              )}
            </div>
            <FormField
              control={form.control}
              name="picture"
              render={() => (
                <FormItem>
                  <FormLabel>Upload Image</FormLabel>
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
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex justify-center space-x-4">
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() => router.push('/')}
              >
                Skip
              </Button>
              <Button
                size="lg"
                type="submit"
                disabled={isPending || !previewImage}
              >
                {isPending ? 'Uploading...' : 'Send Verification'}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogTitle>Confirm Submission</DialogTitle>
          <DialogDescription>
            Are you sure you want to send this verification image? You
            won&apos;t be able to change it once submitted.
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
