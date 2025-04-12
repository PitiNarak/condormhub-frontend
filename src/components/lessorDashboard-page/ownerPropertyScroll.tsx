import type { components } from '@/types/api';
import { redirect } from 'next/navigation';
import { mockData } from '@/mocks/mockProperty';
import { PropertyCard } from '@/components/home-page/propertyCard';
import { fetchOwnerProperty } from '@/actions/lessorDashboard/fetchOwnerProperty';
import { PaginationControl } from '@/components/home-page/paginationControl';

interface PropertyScrollProps {
  page?: number;
  limit?: number;
  showIncome: boolean;
  profileID: string;
}

export async function OwnerPropertyScroll({
  page = 1,
  limit = 12,
  showIncome,
  profileID,
}: PropertyScrollProps) {
  // const redirectPath = `/profile/${profileID}?page=1`
  const redirectPath = `/?page=1`;

  // Get session and owner ID
  const ownerId = profileID;

  if (!ownerId) {
    console.log('no owner id');
    return redirect(redirectPath);
  }

  // Fetch properties by owner ID
  const response = await fetchOwnerProperty(ownerId, page, limit);
  if ('message' in response) {
    console.error('Error fetching properties:', response.message);
    return redirect(redirectPath);
  }

  const propertyData = response.data || JSON.parse(mockData);
  const paginationElement = response.pagination;

  // Range checker: if invalid, redirect to the first page
  if (propertyData.length < 0 || page < 1 || Number.isNaN(page)) {
    redirect(redirectPath);
  }

  // Mock the total income, fee, and final earning
  const totalIncome = 1000;
  const feeDeduction = totalIncome * 0.02;
  const finalIncome = totalIncome - feeDeduction;

  return (
    <div className="mb-10">
      {/* Income Summary */}
      {showIncome ? (
        <div className="px-[5px] xl:px-[20px]">
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6 mx-5">
            <div className="p-6 bg-white rounded-xl shadow-lg text-center">
              <p className="text-gray-500">Total Rent Income</p>
              <p className="text-3xl font-bold text-green-600">
                {totalIncome.toLocaleString()} ฿
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg text-center">
              <p className="text-gray-500">2% Service Fee</p>
              <p className="text-3xl font-bold text-red-500">
                -{feeDeduction.toLocaleString()} ฿
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg text-center">
              <p className="text-gray-500">Your Earnings</p>
              <p className="text-3xl font-bold text-blue-700">
                {finalIncome.toLocaleString()} ฿
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
      {propertyData.length === 0 ? (
        <p className="text-center text-lg text-gray-500 py-10">
          No properties found.
        </p>
      ) : (
        <div className="px-[5px] xl:px-[20px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-5">
            {propertyData.map(
              (data: components['schemas']['dto.DormResponseBody']) => (
                <div key={String(data.id)} className="text-sm">
                  <PropertyCard
                    id={data.id ?? ''}
                    image={
                      data.imagesUrl
                        ? (data.imagesUrl[0] ?? 'https://placehold.co/300x200')
                        : 'https://placehold.co/300x200'
                    }
                    rating={data.rating ?? 0}
                    bedroom={data.bedrooms ?? 0}
                    bathroom={data.bathrooms ?? 0}
                    province={data.address?.province ?? ''}
                    district={data.address?.district ?? ''}
                    price={data.price ?? 0}
                    propertyName={data.name ?? ''}
                  />
                </div>
              )
            )}
          </div>
          <PaginationControl
            lastPage={Number(paginationElement?.last_page)}
            basePath={`/profile/${profileID}`}
          />
        </div>
      )}
    </div>
  );
}
