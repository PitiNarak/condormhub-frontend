import AdminHeader from '@/app/admin/adminHeader';
import AdminView from '@/app/admin/adminView';

export default function AdminPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-4">
      <AdminHeader />
      <AdminView />
    </div>
  );
}
