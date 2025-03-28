import { OwnerPropertyScroll } from '@/components/lessorDashboard-page/ownerPropertyScroll';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page } = await searchParams;

  // Authenticate and check role
  const session = await auth();

  if (!session || session.user?.role !== 'LESSOR') {
    redirect('/'); // Redirect if not a LESSOR
  }

  // Helper function to convert string | string[] | undefined to a number with a fallback value
  const toNumber = (
    value: string | string[] | undefined,
    defaultValue: number
  ): number => {
    const strValue = Array.isArray(value) ? value[0] : value;
    return strValue ? parseInt(strValue, 10) || defaultValue : defaultValue;
  };

  const pageNum = toNumber(page, 1);

  return (
    <div>
      <div className="flex flex-col justify-center items-center p-10 gap-6">
        <div className="flex flex-col gap-3 max-w-3xl w-full">
          <h1 className="text-3xl pt-3 font-semibold text-center">
            Lessor Property Dashboard
          </h1>
        </div>
      </div>
      <OwnerPropertyScroll page={pageNum} />
    </div>
  );
}
