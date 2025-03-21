'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export const LogoutButton: React.FC = () => {
  function onSubmit() {
    signOut();
    redirect('/login');
  }
  return <Button onClick={onSubmit}>Logout</Button>;
};
