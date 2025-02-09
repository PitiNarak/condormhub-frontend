import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export default function PropertyCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">CondoName</CardTitle>
        <CardDescription>
          Clickable Seller&apos;s Profile and Rating
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <div>
            <Image src="/image.jpeg" width={300} height={200} alt="Img"></Image>
          </div>
          <div className="ml-11">
            <p>Bedroom Bathroom</p>
            <p>Size</p>
            <p>Location</p>
            <p>Price</p>
            <div className="mt-2">
              <Button>See Details</Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
