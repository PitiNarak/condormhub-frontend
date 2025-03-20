import { AuthProvider } from '@/components/auth/authProvider';
import { LifestyleForm } from '@/components/lifestyle-page/lifestyleForm';
import { Divider } from '@/components/navigationBar/divider';

export default function LifestyleTagSelectorPage() {
  return (
    <div className="flex flex-col justify-center items-center p-10 gap-6min-h-screen">
      <div className="flex flex-col gap-3 max-w-3xl w-full">
        <h1 className="text-3xl pt-3 font-semibold">Lifestyle Collection</h1>
        <Divider className="max-w-3xl w-full" />
        <p className="text-gray-700">
          Please choose your lifestyle from this collection
        </p>
      </div>
      <AuthProvider>
        <LifestyleForm />
      </AuthProvider>
    </div>
  );
}
