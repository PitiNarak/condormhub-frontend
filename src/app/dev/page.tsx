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
        <SelectedMenu text="Verification Page" path="/verification" />
        <SelectedMenu text="Lessor Rent Income Page" path="/lessorIncome" />
        <SelectedMenu
          text="Lessor Notification Page"
          path="/lessorNotification"
        />
        <SelectedMenu
          text="Lessee Notification Page"
          path="/lesseeNotification"
        />
        <SelectedMenu text="Lessor Property Requests" path="/lessorRequest" />
        <SelectedMenu
          text="Email verification Page"
          path="/emailVerification"
        />
        <SelectedMenu text="Lessor request" path="/lessorRequest" />
        <SelectedMenu text="Profile" path="/profile/1234" />
      </div>
      <div className="flex-col flex gap-3">
        <h1 className="font-bold text-xl">Access token</h1>
        <div className="bg-black text-white p-6 rounded-md flex">
          <p>Bearer {session?.access_token}</p>
          {/* <Button onClick={() =>  navigator.clipboard.writeText(`Bearer ${session?.access_token}`)}>
            <Copy/>
          </Button> */}
        </div>
      </div>
    </div>
  );
};
export default page;
