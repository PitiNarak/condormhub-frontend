'use client';

import { useState, useTransition, FormEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { uploadVerification } from '@/app/verification/action';
import { useRouter } from 'next/navigation';

export default function VerificationForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await uploadVerification(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/');
        router.refresh();
      }
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-md p-6">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <div className="flex justify-center mb-4">
            {previewImage ? (
              <div className="w-full h-64 relative">
                <Image
                  src={previewImage}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ) : (
              <div className="w-full h-64 bg-white border border-gray-300 rounded-lg flex items-center justify-center">
                Upload Student Verification
              </div>
            )}
          </div>
          <div className="flex bg-white border border-gray-300 rounded-lg items-center justify-center p-3">
            <input
              id="picture"
              name="picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/')}
            >
              Back
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
      </div>
    </div>
  );
}
