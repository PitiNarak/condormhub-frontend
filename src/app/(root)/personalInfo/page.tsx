import { AuthProvider } from '@/components/auth/authProvider';
import { UpdateInformationForm } from '@/components/personalInfo-page/personalInfoForm';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (session?.access_token) {
    return (
      <div className="flex flex-col justify-center items-center p-10 gap-6">
        <AuthProvider>
          <UpdateInformationForm />
        </AuthProvider>
      </div>
    );
  } else {
    redirect('/login');
  }
}
