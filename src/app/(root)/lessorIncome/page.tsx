import { LessorDashboard } from '@/components/lessorIncome-page/lessorDashboard';

export default function Page() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-4">
      <p className="text-center text-4xl font-bold text-gray-800">
        Rent Income Dashboard
      </p>
      <LessorDashboard />
    </div>
  );
}
