'use client';

import React from 'react';
import { Image } from 'lucide-react';
import { ImageCarousel } from '@/components/dorm-page/imageCarousel';

interface ImageBoxProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  isSubmit: boolean;
}

export const ImageBox: React.FC<ImageBoxProps> = ({
  images,
  setImages,
  isSubmit,
}) => {
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
        (() => {
          if (isSubmit)
            return (
              <div className="flex flex-col justify-center items-center h-80 w-80 border-4 rounded-xl p-6 mb-2 border-red-400">
                <Image className="text-red-400 h-12 w-12" />
                <span className="mt-2 text-red-400 font-sans">
                  You have to add an image
                </span>
              </div>
            );
          else
            return (
              <div className="flex justify-center items-center h-80 w-80 custom-dashed-border rounded-xl p-6 mb-2 border-gray-300">
                <Image className="text-gray-300 h-12 w-12" />
              </div>
            );
        })()
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
          <span>Upload Image(s)</span>
        </label>
      </div>
    </div>
  );
};
