'use client';

import React from 'react';
import Image from 'next/image';
import { ImageCarousel } from '@/components/dorm-page/imageCarousel';

interface ImageBoxProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ImageBox: React.FC<ImageBoxProps> = ({ images, setImages }) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const uploadedImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prev) => [...prev, ...uploadedImages]);
  };
  return (
    <div className="flex flex-col justify-center items-center p-5 gap-3.5">
      {images.length === 0 ? (
        <div>
          <div>
            <Image
              src={'/college-dormitory.png'}
              alt="dorm image"
              height={800}
              width={800}
              className="max-w-7xl w-full pl-2"
            />
          </div>
        </div>
      ) : (
        <ImageCarousel images={images} />
      )}
      <div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="max-w-7xl w-full flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-800 transition"
        >
          <span className="text-lg font-semibold">Upload Image(s)</span>
        </label>
      </div>
    </div>
  );
};
