import * as React from 'react';

import { PropertyDetailButton } from './PropertyDetail';
import {
  Card,
  CardContent,
  CardDescription,
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
      <CardContent className="pb-3">
        <div className="flex">
          <div className="justify-center m-auto">
            <Image src="/image.jpeg" width={300} height={200} alt="Img"></Image>
          </div>
          <div className="flex-1 ml-11 text-start hidden md:block">
            <p>2 Bed 2 Bath</p>
            <p>32 sq.m.</p>
            <p>254 Phaya Thai Rd, Wang Mai, Pathum Wan, Bangkok 10330</p>
            <p>15,000 Baht</p>
          </div>
        </div>
        <div className="mt-2 text-center md:text-end">
          <PropertyDetailButton />
        </div>
      </CardContent>
    </Card>
  );
}
