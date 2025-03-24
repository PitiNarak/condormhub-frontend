import VerificationHeader from '@/components/verifyStudent-page/verificationHeader';
import VerificationForm from '@/components/verifyStudent-page/verificationForm';

export default function VerificationPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-4">
      <VerificationHeader />
      <VerificationForm />
    </div>
  );
}
