import React from 'react';

import { redirect } from 'next/navigation';
import { Divider } from '@/components/navigationBar/divider';
import { auth } from '@/lib/auth';
import { VerificationScroll } from '@/components/admin-page/verificationScroll';

export default async function Page() {
  const session = await auth();
  if (session?.access_token && session.user?.role == 'ADMIN') {
    return (
      <div className="flex flex-col justify-center items-center p-5 gap-6">
        <div className="flex flex-col gap-3 max-w-6xl w-full">
          <h1 className="text-3xl pt-3 font-semibold">
            Student Verification Review
          </h1>
          <Divider className="max-w-6xl w-full mb-5" />
          <VerificationScroll />
        </div>
      </div>
    );
  } else {
    redirect('/');
  }
}
