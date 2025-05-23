import React from 'react';

import { redirect } from 'next/navigation';
import { Divider } from '@/components/navigationBar/divider';
import DormRegisterBox from '@/components/registerDorm-page/dormRegisterBox';
import { auth } from '@/lib/auth';

export default async function Page() {
  const session = await auth();
  if (session?.access_token && session.user?.role != 'LESSEE') {
    return (
      <div className="flex flex-col justify-center items-center p-5 gap-6">
        <div className="flex flex-col gap-3 max-w-6xl w-full">
          <h1 className="text-3xl pt-3 font-semibold">
            Dormitory registration
          </h1>
          <Divider className="max-w-6xl w-full" />
          <DormRegisterBox />
        </div>
      </div>
    );
  } else {
    redirect('/');
  }
}
