import Divider from '@/components/layout/Divider';
import { auth } from '@/lib/auth';
import Image from 'next/image';
import React from 'react';
import ChangeEmailDialog from '@/components/profileSetting/ChangeEmailDialog';

const page = async () => {
  const session = await auth();

  // if (session) {
  //   return <div>page</div>;
  // } else {
  //   redirect('/login');
  // }
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
        <h2 className="text-xl font-semibold">Email</h2>
        <div className="flex items-center justify-between w-full">
          <p>{session?.user.email}</p>
          <ChangeEmailDialog />
        </div>
      </div>

      <Divider />
    </div>
  );
};

export default page;
