import { auth } from '@/lib/auth';
import React from 'react';
import ChangeEmailDialog from '@/components/profileSetting/ChangeEmailDialog';
import UpdateInformationForm from '@/components/profileSetting/UpdateInformationForm';
import { redirect } from 'next/navigation';
import Divider from '@/components/layout/Divider';

const page = async () => {
  const session = await auth();

  if (session) {
    return (
      <div className="flex flex-col justify-center items-center p-10 gap-6">
        <div className="flex max-w-3xl w-full">
          <h1 className="text-3xl pt-3 font-semibold">Profile Settings</h1>
        </div>
        <Divider className="max-w-3xl w-full" />
        <div className="flex flex-col min-w-96 gap-y-1 w-full max-w-3xl">
          <h2 className="font-semibold">Email</h2>
          <div className="flex items-center gap-10 w-full">
            <p>{session?.user.email}</p>
            <ChangeEmailDialog />
          </div>
        </div>
        <UpdateInformationForm session={session} />
      </div>
    );
  } else {
    redirect('/login');
  }
};
export default page;
