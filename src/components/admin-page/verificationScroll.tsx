import { fetchPendingVerifications } from '@/actions/admin/fetchPendingVerifications';
import { VerificationCard } from '@/components/admin-page/verificationCard';
import { PaginationControl } from '@/components/home-page/paginationControl';
import { redirect } from 'next/navigation';

interface VerificationScrollProps {
  page?: number;
  limit?: number;
}

export async function VerificationScroll({
  page = 1,
  limit = 12,
}: VerificationScrollProps) {
  const adminPagePath = '/admin/verifications?page=1';
  const response = await fetchPendingVerifications(page, limit);

  // Check if response has data
  if ('message' in response) {
    // Handle error case
    return (
      <p className="text-center text-lg text-gray-500 py-10">
        Error fetching verifications: {response.message}
      </p>
    );
  }

  const verificationData = response.data || [];
  const paginationElement = response.pagination;

  // Range checker if not valid go to first page
  if (
    (verificationData.length < 0 && page > 1) ||
    page < 1 ||
    Number.isNaN(page)
  ) {
    redirect(adminPagePath);
  }

  return (
    <div className="mb-10">
      {verificationData.length === 0 ? (
        <p className="text-center text-lg text-gray-500 py-10">
          No pending verifications found.
        </p>
      ) : (
        <div className="px-[5px] xl:px-[20px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-10">
            {verificationData.map((data) => (
              <div key={String(data.user?.id)} className="text-sm">
                <VerificationCard
                  id={data.user?.id || ''}
                  evidenceUrl={data.evidence?.url || ''}
                  firstname={data.user?.firstname || ''}
                  lastname={data.user?.lastname || ''}
                  username={data.user?.username || ''}
                />
              </div>
            ))}
          </div>
          <div className="mt-10">
            <PaginationControl
              lastPage={Number(paginationElement?.last_page) || 1}
              basePath="/admin"
            />
          </div>
        </div>
      )}
    </div>
  );
}
