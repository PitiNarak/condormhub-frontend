import { getDormByID } from '@/action/dorm/getDormByID';
import { ImageCarousel } from '@/components/dorm-page/imageCarousel';
import { RequestBtn } from '@/components/lesseeHome-page/requestBtn';
import Image from 'next/image';
import React from 'react';
//a2219d93-9840-4101-a451-c3c38674ef5c
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const res = await getDormByID(id);
  console.log(res);
  if (res && !('error' in res)) {
    return (
      <div className="pt-5 flex flex-col items-center gap-4 pb-5">
        <h1 className="text-center text-5xl font-bold">{res.name}</h1>
        <ImageCarousel />
        <Image
          src="https://media.discordapp.net/attachments/1232213254302863396/1351847049859174443/th.png?ex=67dbdd2c&is=67da8bac&hm=8f6ff77fbe6dfa4f2214cf234f264c99c0d58c811797397a6c64d149c4502fec&=&format=webp&quality=lossless&width=960&height=960"
          alt="placeHolder"
          width={400}
          height={400}
          className="rounded-xl"
        />
        <div className="flex justify-between lg:w-[1000px] mt-10 sm:w-[90%] w-[1000px]">
          <div className="w-[80%] text-left flex-col flex gap-4 pr-8">
            <p className="text-xl">
              {res.address.subdistrict}, {res.address.district},{' '}
              {res.address.province}, {res.address.zipcode}
            </p>
            <p>
              {res.bedrooms} bedroom, {res.bathrooms} bathroom | size:{' '}
              {res.size} m<sup>2</sup>
            </p>
            <div className="flex border-2 rounded-lg w-[50%] justify-between p-5">
              <p>rating</p>
              <p>link to review</p>
            </div>
            <div className="gap-2 flex-col flex">
              <h2 className="font-bold">Hosted By</h2>
              <p>{res.owner?.username}</p>
            </div>
            <div className="gap-2 flex-col flex">
              <h2 className="font-bold">Description</h2>
              <p>{res.description}</p>
            </div>
          </div>
          <div className="w-[20%] h-min text-center border-2 rounded-lg p-5 flex flex-col gap-6">
            <div className="">
              <h2 className="font-bold text-2xl">Price</h2>
              <p className="text-xl">฿{res.price.toLocaleString()}</p>
            </div>
            <RequestBtn />
          </div>
        </div>
      </div>
    );
  }
};

export default page;
