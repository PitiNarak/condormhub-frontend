import { CopyBtn } from '@/components/dev-page/copyBtn';
import { SelectedMenu } from '@/components/navigationBar/selectedMenu';
import { auth } from '@/lib/auth';
import React from 'react';

const page = async () => {
  const session = await auth();
  return (
    <div className="p-10 pl-16 gap-10 flex flex-col">
      <div>
        <SelectedMenu text="Admin Page" path="/admin" />
        <SelectedMenu text="Register Page" path="/register" />
        <SelectedMenu
          text="Student Verification Page"
          path="/studentVerification"
        />
        <SelectedMenu
          text="Lessor Property Dashboard Page"
          path="/lessorDashboard"
        />
        <SelectedMenu
          text="Lessor Notification Page"
          path="/lessorNotification"
        />
        <SelectedMenu
          text="Lessee Notification Page"
          path="/lesseeNotification"
        />
        <SelectedMenu text="Lessor Property Requests" path="/leasingRequest" />
        <SelectedMenu
          text="Email verification Page"
          path="/emailVerification"
        />
        <SelectedMenu text="Leasing request" path="/leasingRequest" />
        <SelectedMenu text="Profile" path="/profile/1234" />
      </div>
      <div className="flex-col flex gap-3">
        <h1 className="font-bold text-xl">Access token</h1>
        <div className="bg-black text-white p-6 rounded-md flex items-center gap-5">
          <p className="break-all w-11/12">Bearer {session?.access_token}</p>
          <CopyBtn text2copy={`Bearer ${session?.access_token}`} />
        </div>
      </div>
      <div className="flex-col flex gap-3">
        <h1 className="font-bold text-xl">Refresh token</h1>
        <div className="bg-black text-white p-6 rounded-md flex items-center gap-5">
          <p className="break-all w-11/12">Bearer {session?.refresh_token}</p>
          <CopyBtn text2copy={`Bearer ${session?.refresh_token}`} />
        </div>
      </div>
      <div className="flex-col flex gap-3">
        <h1 className="font-bold text-xl">Expired date</h1>
        <div className="bg-black text-white p-6 rounded-md flex items-center gap-5">
          <p className="break-all w-11/12">{session?.access_token_expired}</p>
          <CopyBtn text2copy={session?.access_token_expired?.toString()} />
        </div>
      </div>
    </div>
  );
};
export default page;
