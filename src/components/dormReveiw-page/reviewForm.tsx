'use client';

import { useState } from 'react';
import { CreateReview } from '@/actions/reviewDorm/createReviewDorm';
import { useToast } from '@/hooks/use-toast';
import { CircleCheckBig } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { ImageBox } from '@/components/registerDorm-page/dormImage';
import { uploadReviewImage } from '@/actions/reviewDorm/uploadReviewImage';

export function ReviewForm({ historyId }: { historyId: string }) {
  const { toast } = useToast();
  const [rate, setRate] = useState(2);
  const [message, setMessage] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleClick = (value: number) => {
    setRate(value);
    console.log('Selected rate:', rate);
  };

  const handleMessage = (value: string) => {
    setMessage(value);
    console.log(message);
  };

  async function onSubmit() {
    const review = { rate: rate, message: message };
    const res = await CreateReview(historyId, review);
    console.log(res);
    if (res && 'error' in res) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: res.error as string,
      });
    } else {
      for (const imageUrl of images) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: blob.type });
        await uploadReviewImage(file, historyId);
      }
      toast({
        description: (
          <div className="flex gap-5">
            <CircleCheckBig className="text-green-500" />
            <p className="text-base">Review successfully</p>
          </div>
        ),
      });
      redirect('/');
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-items-center items-center gap-10">
        <ImageBox images={images} setImages={setImages} />
        <div className="rating rating-xl bg-yellow gap-10">
          {[1, 2, 3, 4, 5].map((value) => (
            <input
              key={value}
              type="radio"
              name="rating"
              value={value}
              checked={rate === value}
              onChange={() => handleClick(value)}
              className="mask mask-star bg-yellow-400 scale-[160%]"
              aria-label={`${value} star`}
            />
          ))}
        </div>
        <textarea
          className="flex h-24 border border-input px-1 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full rounded-lg bg-background pl-5"
          placeholder="Review this dorm"
          onChange={(e) => handleMessage(e.target.value)}
        ></textarea>
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  );
}
