'use client';

import { useState } from 'react';
import { CreateReview } from '@/actions/reviewDorm/createReviewDorm';
import { useToast } from '@/hooks/use-toast';
import { CircleCheckBig } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export function ReviewForm({ dormId }: { dormId: string }) {
  const { toast } = useToast();
  const [rate, setRate] = useState(2);
  const [message, setMessage] = useState('');

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
    const res = await CreateReview(dormId, review);
    if (res && 'error' in res) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: res.error as string,
      });
    } else {
      toast({
        description: (
          <div className="flex gap-5">
            <CircleCheckBig className="text-green-500" />
            <p className="text-base">Review successfully</p>
          </div>
        ),
      });
    }
    redirect('/');
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col justify-items-center">
        {/* <h1 className='tracking-tight text-2xl text-center'>Rate this dorm</h1> */}
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
      </div>
      <textarea
        className="flex h-24 border border-input px-1 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full rounded-lg bg-background pl-5"
        placeholder="Review this dorm"
        onChange={(e) => handleMessage(e.target.value)}
      ></textarea>
      <Button onClick={onSubmit}>Submit</Button>
    </div>
  );
}
