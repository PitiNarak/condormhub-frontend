'use client';
import ReviewBox, { reviewI } from '@/components/profile/Review';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface reviewI_ID extends reviewI {
  reviewID: number;
}

const mockData = JSON.stringify([
  {
    reviewID: 1,
    reviewerID: '1234',
    reviewDate: '17/01/2004',
    reviewMessage: 'This guys is a good one',
  },
  {
    reviewID: 2,
    reviewerID: '2345',
    reviewDate: '17/01/2004',
    reviewMessage: 'This ',
  },
  {
    reviewID: 3,
    reviewerID: '3456',
    reviewDate: '17/01/2004',
    reviewMessage: 'This guys ',
  },
  {
    reviewID: 4,
    reviewerID: '4567',
    reviewDate: '17/01/2004',
    reviewMessage: 'This guys is ',
  },
  {
    reviewID: 5,
    reviewerID: '5678',
    reviewDate: '17/01/2004',
    reviewMessage: 'This guys is a ',
  },
  {
    reviewID: 6,
    reviewerID: '6789',
    reviewDate: '17/01/2004',
    reviewMessage: 'This guys is a good ',
  },
]);

export default function LesseeReview() {
  const params = useParams<{ tag: string; item: string }>();

  //const data = fetch(get lessee history from ID)
  const reviews = JSON.parse(mockData);
  console.log(params);

  return (
    <div className="mt-[12px] flex justify-center mx-auto">
      <div className="w-[80%]">
        <p className="text-2xl font-bold">User&apos;s review</p>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {reviews.map((data: reviewI_ID) => (
              <div key={data.reviewID} className="flex">
                <ReviewBox
                  reviewerID={data.reviewerID}
                  reviewDate={data.reviewDate}
                  reviewMessage={data.reviewMessage}
                />
                <Separator orientation="vertical" />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
