'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';

export default function VerificationPage() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Generate preview URL
      setImage(imageUrl);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-between py-40 px-4">
      {/* Header */}
      <div className="text-center">
        <p className="text-4xl font-bold text-gray-800">Student Verification</p>
        <p className="text-lg text-gray-600 mt-2">
          Please upload an image proving that you are a student
        </p>
      </div>

      {/* Image Upload Section */}
      <div className="flex flex-col items-center">
        <div className="w-96 h-56 bg-gray-300 flex items-center justify-center rounded-lg shadow-md overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-gray-600">Student Verification Image</p>
          )}
        </div>

        {/* File Upload Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-6 block w-full text-center text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer p-2"
        />
      </div>

      {/* Buttons */}
      <div className="mt-8 space-x-4 flex">
        <Link href="/">
          <Button size="lg">Send Verification</Button>
        </Link>

        <Link
          href="/"
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
        >
          Back
        </Link>
      </div>
    </div>
  );
}
