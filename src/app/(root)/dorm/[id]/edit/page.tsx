import { getDormByID } from '@/actions/dorm/getDormByID';
import { ImageCarousel } from '@/components/dorm-page/imageCarousel';
import { AddImageBtn } from '@/components/editDorm-page/addImageBtn';
import { EditDormForm } from '@/components/editDorm-page/editDormForm';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await getDormByID(id);
  const session = await auth();

  if (res && !('error' in res)) {
    if (session?.access_token) {
      if (
        (session.user?.role === 'LESSOR' || session.user?.role === 'ADMIN') &&
        session.user.id === res.owner?.id
      ) {
        return (
          <div className="pt-5 flex flex-col items-center gap-4 pb-5">
            <h1 className="text-center text-5xl font-bold">{res.name}</h1>
            {res.imagesUrl && res.imagesUrl.length > 0 && (
              <ImageCarousel images={res.imagesUrl} />
            )}
            <AddImageBtn dormId={id} access_token={session.access_token} />

            <div className="flex justify-between lg:w-[1000px] mt-10 sm:w-[90%] w-[1000px]">
              <div className="w-full text-left flex-col flex gap-4 pr-8">
                <EditDormForm
                  dormInfo={res}
                  access_token={session.access_token}
                />
              </div>
            </div>
          </div>
        );
      } else {
        redirect(`/dorm/${res.id}`);
      }
    }
  }
};

export default page;
