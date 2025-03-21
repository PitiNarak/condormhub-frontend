import { EmailVerifyForm } from '@/components/verifyEmail-page/emailVerifyForm';
import { Suspense } from 'react';
export default function Page() {
  return (
    <div className="mx-4 items-center justify-center pt-8">
      <Suspense>
        <EmailVerifyForm />
      </Suspense>
    </div>
  );
}
