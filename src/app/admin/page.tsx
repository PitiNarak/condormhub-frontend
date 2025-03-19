import AdminView from '@/components/admin-page/adminView';

export default function Page() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-4">
      <p className="text-4xl font-bold text-gray-800">Admin View</p>
      <AdminView />
    </div>
  );
}
