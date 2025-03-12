import LifestyleForm from '@/app/(root)/lifestyle/lifestyleForm';
import LifestyleHeader from '@/app/(root)/lifestyle/lifestyleHeader';

export default function LifestyleTagSelectorPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <LifestyleHeader />
      <LifestyleForm />
    </div>
  );
}
