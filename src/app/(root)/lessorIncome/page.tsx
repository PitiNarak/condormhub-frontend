import LessorDashboard from '@/components/lessorIncome-page/lessorDashboard';
import LessorDashHeader from '@/components/lessorIncome-page/lessorDashHeader';

export default function LessorIncome() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-4">
      <LessorDashHeader />
      <LessorDashboard />
    </div>
  );
}
