import { UpdateInformationForm } from '@/components/personalInfo-page/personalInfoForm';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (session?.access_token) {
    return (
      <div className="flex flex-col justify-center items-center p-10 gap-6">
        <div>
          <p className="text-center text-4xl font-bold">
            Welcome {session.user?.username}
          </p>
          <p className="text-center text-gray-500">
            Please fill your personal information
          </p>
        </div>
        <UpdateInformationForm />
      </div>
    );
  } else {
    redirect('/login');
  }
}
