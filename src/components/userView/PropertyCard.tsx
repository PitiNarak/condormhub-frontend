import * as React from 'react';
import Link from 'next/link';
import { PropertyDetailButton } from './PropertyDetail';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
interface PropertyProp {
  image: string;
  owner: string;
  rating: number;
  bedroom: number;
  bathroom: number;
  province: string;
  district: string;
  price: number;
}

export default function PropertyCard({
  image,
  owner,
  rating,
  bedroom,
  bathroom,
  province,
  district,
  price,
}: PropertyProp) {
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
            <Link
              href="/navigation/profile"
              className="absolute top-2 right-1 bg-white px-3 py-1 rounded-2xl"
            >
              {owner} <span>{rating} ⭐</span>
            </Link>
          </div>
          <div className="flex">
            <div className="pl-2">
              <p className="font-bold">
                {district}, {province}
              </p>
              <p>
                {bedroom} Bed {bathroom} Bath
              </p>
              <p>{price} Baht</p>
            </div>
            <div className="flex-1 relative">
              <div className="absolute bottom-0 right-0">
                <PropertyDetailButton />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
