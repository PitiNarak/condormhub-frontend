'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

export const LogoutButton: React.FC = () => {
  const router = useRouter();

  function onSubmit() {
    signOut();
    router.push('/home');
    console.log('loged out');
  }
  return (
    <Button onClick={onSubmit} variant="destructive">
      Logout
    </Button>
  );
};
