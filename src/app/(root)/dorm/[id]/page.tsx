import { getDormByID } from '@/actions/dorm/getDormByID';
import { EditDormButton } from '@/components/dorm-page/editDormButton';
import { ImageCarousel } from '@/components/dorm-page/imageCarousel';
import { RequestBtn } from '@/components/lesseeHome-page/requestBtn';
import { auth } from '@/lib/auth';
import React from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const res = await getDormByID(id);
  const session = await auth();

  if (res && !('error' in res)) {
    return (
      <div className="pt-5 flex flex-col items-center gap-4 pb-5">
        <h1 className="text-center text-5xl font-bold">{res.name}</h1>
        {res.imagesUrl && res.imagesUrl.length > 0 && (
          <ImageCarousel images={res.imagesUrl} />
        )}

        <div className="flex justify-between lg:w-[1000px] mt-10 sm:w-[90%] w-[1000px]">
          <div className="w-[80%] text-left flex-col flex gap-4 pr-8">
            <EditDormButton
              dormOwnerID={res.owner?.id}
              session={session}
              dormID={res.id}
            />
            <p className="text-xl">
              {res.address?.subdistrict}, {res.address?.district},{' '}
              {res.address?.province}, {res.address?.zipcode}
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
            <div>
              <h2 className="font-bold text-2xl">Price</h2>
              <p className="text-xl">฿{res.price?.toLocaleString()}</p>
            </div>
            <RequestBtn />
          </div>
        </div>
      </div>
    );
  }
};

export default page;
