import { AuthProvider } from '@/components/auth/authProvider';
import { UpdateInformationForm } from '@/components/personalInfo-page/personalInfoForm';
import { PersonalHeader } from '@/components/personalInfo-page/personalInfoHeader';

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center p-10 gap-6">
      <AuthProvider>
        <PersonalHeader />
        <UpdateInformationForm />
      </AuthProvider>
    </div>
  );
}
