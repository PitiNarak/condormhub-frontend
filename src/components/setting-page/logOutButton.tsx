'use client';

import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const LogoutButton: React.FC = () => {
  function onSubmit() {
    signOut();
    redirect('/login');
  }
  return (
    <span onClick={onSubmit} className="w-full">
      Logout
    </span>
  );
};
