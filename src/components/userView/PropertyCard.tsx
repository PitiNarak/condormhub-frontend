import * as React from 'react';

import { PropertyDetailButton } from './PropertyDetail';
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
            <p>2 Bed 2 Bath</p>
            <p>32 sq.m.</p>
            <p>254 Phaya Thai Rd, Wang Mai, Pathum Wan, Bangkok 10330</p>
            <p>15,000 Baht</p>
            <div className="mt-2">
              <PropertyDetailButton />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
