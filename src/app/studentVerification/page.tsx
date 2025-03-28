import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { VerificationForm } from '@/components/verifyStudent-page/verificationForm';

export default async function VerificationPage() {
  const session = await auth();

  if (!session?.access_token) {
    redirect('/login');
  }

  const access_token = session.access_token;

  return (
    <div className="flex flex-col justify-center items-center p-10 gap-6">
      <div className="flex flex-col gap-3 max-w-3xl w-full">
        <h1 className="text-3xl pt-3 font-semibold text-center">
          Student Verification
        </h1>
      </div>
      <VerificationForm access_token={access_token} />
    </div>
  );
}
