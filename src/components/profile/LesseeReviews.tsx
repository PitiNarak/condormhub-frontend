'use client';
import ReviewBox from '@/components/profile/Review';
import { useParams } from 'next/navigation';
import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Separator } from '../ui/separator';

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

export function LesseeReview() {
  const params = useParams<{ tag: string; item: string }>();

  //const data = fetch(get lessee history from ID)
  const reviews = JSON.parse(mockData);
  const owner = 'Piti';
  console.log(params);
  return (
    <div className="mt-3">
      <p className="text-xl font-bold text-center py-3">
        {owner}&apos;s Reviews
      </p>
      <Carousel
        opts={{ align: 'start' }}
        className="w-[250px] md:w-[600px] lg:w-[900px] xl:w-[1200px]"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="p-1">
                <div key={reviews[index].reviewerID} className="flex">
                  <ReviewBox
                    reviewerID={reviews[index].reviewerID}
                    reviewDate={reviews[index].reviewDate}
                    reviewMessage={reviews[index].reviewMessage}
                  />
                  <Separator orientation="vertical" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
