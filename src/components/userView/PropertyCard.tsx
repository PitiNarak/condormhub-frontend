import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { MiniPropertyI } from '../dataClass/property';
import { displayPrice } from '../dataClass/display';

export default function PropertyCard({
  image,
  rating,
  bedroom,
  bathroom,
  propertyName,
  province,
  district,
  price,
}: MiniPropertyI) {
  return (
    <Card className="w-full shadow-none border-none">
      <CardContent className="pb-3 px-0">
        <div className="">
          <div className="justify-center mx-auto w-full h-full mb-2 relative">
            <Image
              src={image}
              alt="Description of image"
              width={500}
              height={300}
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex">
            <div className="pl-2">
              <p className="font-bold text-lg">{propertyName}</p>
              <p className="font-bold">
                {district}, {province}
              </p>
              <p>
                {bedroom} Bed {bathroom} Bath
              </p>
              <p>{displayPrice(price)} Baht</p>
            </div>
            <div className="flex-1 relative">
              <div className="absolute top-0 right-0 flex ">
                <p className="content-center">{rating}&nbsp;</p>
                <Star size={18} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
