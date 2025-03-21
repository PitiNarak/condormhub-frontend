'use client';

import { verifyEmail } from '@/actions/verifyEmail/verify';
import { EmailVerifyCard } from '@/components/verifyEmail-page/emailVerifyCard';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function EmailVerifyForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  if (!token) {
    redirect('/');
  }
  useEffect(() => {
    const res = verifyEmail(token ?? '');
    res
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return <EmailVerifyCard isLoading={false} error="" />;
}
