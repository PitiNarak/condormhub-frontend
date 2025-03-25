'use client';

import React, { useState } from 'react';
import { ImageBox } from '@/components/registerDorm-page/dormImage';

export const DormRegisterBox = () => {
  const [images, setImages] = useState<string[]>([]);
  return (
    <div>
      <ImageBox images={images} setImages={setImages} />
    </div>
  );
};
