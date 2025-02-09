import Divider from '@/components/layout/Divider';
import { auth } from '@/lib/auth';
import Image from 'next/image';
import React from 'react';
import ChangeEmailDialog from '@/components/profileSetting/ChangeEmailDialog';
import UpdateInformationForm from '@/components/profileSetting/UpdateInformationForm';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await auth();

  if (session) {
    return (
      <div className="flex flex-col justify-center items-center p-10 gap-10">
        <h1 className="text-5xl text-center">Update personal information</h1>
        <Image
          src={
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
          }
          alt="Profile picture"
          width={200}
          height={200}
          className="rounded-full"
        />
        <div className="flex flex-col w-96 gap-2">
          <h2 className="font-semibold">Email</h2>
          <div className="flex items-center justify-between w-full">
            <p>{session?.user.email}</p>
            <ChangeEmailDialog />
          </div>
        </div>

        <Divider />
        <UpdateInformationForm session={session} />
      </div>
    );
  } else {
    redirect('/login');
  }
};
export default page;
