'use client';

import { verifyEmail } from '@/actions/verifyEmail/verify';
import { EmailVerifyCard } from '@/components/verifyEmail-page/emailVerifyCard';
import { useSession } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function EmailVerifyForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { update } = useSession();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  if (!token) {
    redirect('/');
  }
  useEffect(() => {
    const res = verifyEmail(token ?? '');
    res.then((data) => {
      if ('error' in data) {
        setErrorMsg(data.error as string);
      } else {
        update({
          user: data.data?.userInformation,
          accessToken: data.data?.accessToken,
          refreshToken: data.data?.refreshToken,
        });
      }
      setIsLoading(false);
    });
  }, [token]);
  return <EmailVerifyCard isLoading={isLoading} error={errorMsg} />;
}
