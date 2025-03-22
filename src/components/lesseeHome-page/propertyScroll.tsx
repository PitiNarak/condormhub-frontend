import { fetchProperty } from '@/actions/lesseeView/fetchProperty';
import type { components } from '@/types/api';
import { PaginationControl } from '@/components/lesseeHome-page/paginationControl';
import { redirect } from 'next/navigation';

import { mockData } from '@/mocks/mockProperty';
import { PropertyCard } from '@/components/lesseeHome-page/propertyCard';

interface PropertyScrollProps {
  page: string | string[] | undefined;
}

export async function PropertyScroll({ page }: PropertyScrollProps) {
  const lesseePagePath = '/home/lesseeView?page=1';
  const pageNum = Number(page ? page : '1');
  const response = await fetchProperty(pageNum);

  const propertyData =
    'message' in response ? JSON.parse(mockData) : response.data;
  const paginationElement = response.pagination;

  //Range checker if not valid go to first page
  if (propertyData.length == 0 || pageNum < 1 || Number.isNaN(pageNum)) {
    redirect(lesseePagePath);
  }

  return (
    <div className="shadow-md border border-gray-100 pt-14 pb-12 overflow-hidden">
      <p className="block text-center text-lg w-[150px] mb-8 ml-2 rounded-2xl border border-gray-400">
        No Filters
      </p>
      <div className="flex flex-wrap justify-center gap-3 mx-5">
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
                province={data.address ? (data.address.province ?? '') : ''}
                district={data.address ? (data.address.district ?? '') : ''}
                price={data.price ?? 0}
                propertyName={data.name ?? ''}
              />
            </div>
          )
        )}
      </div>
      <PaginationControl lastPage={Number(paginationElement?.last_page)} />
    </div>
  );
}
