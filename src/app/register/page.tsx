import { RegisterBox } from '@/components/register-page/registerBox';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect('/');
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex-1 w-full max-w-md pt-14 mx-4">
        <RegisterBox />
      </div>
    </div>
  );
}
