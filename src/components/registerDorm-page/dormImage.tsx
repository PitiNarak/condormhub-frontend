'use client';

import React from 'react';
import { Image } from 'lucide-react';
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
    <div className="flex flex-col justify-center items-center p-3 gap-3.5">
      {images.length === 0 ? (
        <div className="flex justify-center items-center h-80 w-80 border-4 border-gray-400 border-dashed rounded-xl p-6  mb-2">
          <Image className="text-gray-400" />
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
