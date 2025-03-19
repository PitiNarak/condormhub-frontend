import { AuthProvider } from '@/components/auth/authProvider';
import { LifestyleForm } from '@/components/lifestyle-page/lifestyleForm';

export default function LifestyleTagSelectorPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center py-10 px-4">
        <p className="text-4xl font-bold text-gray-800">Lifestyle Collection</p>
        <p className="text-gray-600 mt-2">
          Please choose your lifestyle from this collection
        </p>
      </div>
      <AuthProvider>
        <LifestyleForm />
      </AuthProvider>
    </div>
  );
}
