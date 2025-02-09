import VerificationHeader from '@/app/verification/verificationHeader';
import VerificationForm from '@/app/verification/verificationForm';

export default function VerificationPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-4">
      <VerificationHeader />
      <VerificationForm />
    </div>
  );
}
