import * as React from 'react';
import { PropertyDetailButton } from './PropertyDetail';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Star } from 'lucide-react';
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
  console.log(owner);
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
              <p className="font-bold">
                {district}, {province}
              </p>
              <p>
                {bedroom} Bed {bathroom} Bath
              </p>
              <p>{price} Baht</p>
            </div>
            <div className="flex-1 relative">
              <div className="absolute top-0 right-0 flex ">
                <p className="content-center">{rating}&nbsp;</p>
                <Star size={18} />
              </div>
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
