import * as React from 'react';
import Link from 'next/link';
import { PropertyDetailButton } from './PropertyDetail';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function PropertyCard() {
  return (
    <Card className="w-full shadow-none border-none">
      <CardContent className="pb-3 px-0">
        <div className="">
          <div className="justify-center mx-auto w-full h-full mb-2 relative">
            <Image
              src="/image.jpeg"
              alt="Description of image"
              width={500}
              height={300}
              className="object-cover rounded-md"
            />
            <Link
              href="/navigation/profile"
              className="absolute top-2 right-1 bg-white px-3 py-1 rounded-2xl"
            >
              Piti <span>4.9 ⭐</span>
            </Link>
          </div>
          <div className="flex">
            <div className="pl-2">
              <p className="font-bold">Pathum Wan, Bangkok</p>
              <p>2 Bed 2 Bath</p>
              <p>15,000 Baht</p>
            </div>
            <div className="justify-end mx-auto content-center">
              <PropertyDetailButton />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
