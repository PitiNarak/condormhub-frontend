'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams<{ tag: string; item: string }>();

  //const data = fetch(get user from ID)
  console.log(params);

  return (
    <div>
      <div className="flex justify-center mx-auto">
        <Image
          src="/image.jpeg"
          alt="userProfile"
          height={200}
          width={200}
          className="object-cover h-[150px] w-[150px] lg:h-[200px] lg:w-[200px] rounded-[50%]"
        />
      </div>
      <div className="text-center">
        <div className="flex justify-center m-auto items-center">
          <p className="text-3xl font-bold mr-2">Username</p>
          <p>{4.5}</p>
          <div>
            <Star />
          </div>
        </div>
        <p className="text-gray-600 mb-2">FullName LastName</p>
        <p className="text-gray-400 mb-2">Chulalongkorn University</p>
        <div className="flex">
          <p className="justify-center mx-auto px-5 py-1 border rounded-2xl bg-gray-100">
            Lessee
          </p>
        </div>
      </div>
    </div>
  );
}
