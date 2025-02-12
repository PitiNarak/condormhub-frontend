import { RegisterBox } from '@/components/signUpIn/RegisterBox';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect('/home');
  } else {
    return (
      <div className="justify-center m-auto pt-14 flex w-9/12 max-w-[450px]">
        <div className="flex-1">
          <RegisterBox />
        </div>
      </div>
    );
  }
}
