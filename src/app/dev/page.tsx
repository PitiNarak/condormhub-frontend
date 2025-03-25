import { SelectedMenu } from '@/components/navigationBar/selectedMenu';
import React from 'react';

const page = () => {
  return (
    <div className="p-10 pl-16">
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
      <SelectedMenu text="Email verification Page" path="/emailVerification" />
      <SelectedMenu text="Lessor request" path="/lessorRequest" />
      <SelectedMenu text="Profile" path="/profile/1234" />
    </div>
  );
};
export default page;
