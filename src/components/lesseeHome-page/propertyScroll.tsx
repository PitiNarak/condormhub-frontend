import { fetchProperty } from '@/actions/fetchProperty';
import type { components } from '@/types/api';
import PaginationControl from '@/components/lesseeHome-page/paginationControl';
import { redirect } from 'next/navigation';
import { PropertyDetail } from '@/components/lesseeHome-page/propertyDetail';
import { mockData } from '@/mocks/mockProperty';

export async function PropertyScroll({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const lesseePagePath = '/home/lesseeView?page=1';
  const page = Number(sp.page ?? '1');

  // console.log(page)
  const data = await fetchProperty(page);

  const propertyData = !data ? JSON.parse(mockData) : data;
  if (propertyData.length == 0 || page < 1 || Number.isNaN(page)) {
    redirect(lesseePagePath);
  }
  return (
    <div className="shadow-md border border-gray-100 pt-14 pb-12">
      <p className="block text-center text-lg w-[150px] mb-8 ml-2 rounded-2xl border border-gray-400">
        No Filters
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-5">
        {propertyData.map((data: components['schemas']['domain.Dorm']) => (
          <div key={String(data.id)} className="text-sm">
            <PropertyDetail
              id={data.id ? data.id : ''}
              image={
                'https://publics.condormhub.xyz/dorms/c9951243-2d38-4a48-aa5b-0fc680eb078a-d73fa3d7-3f3f-46cc-9a3c-d5afebdc2286.webp'
              }
              rating={data.rating ? data.rating : 0}
              bedroom={data.bedrooms}
              bathroom={data.bathrooms}
              province={data.address.province}
              district={data.address.district}
              price={data.price}
              propertyName={data.name}
              owner={data.owner ? data.owner.username : ''}
              size={data.size}
              description={data.description ? data.description : ''}
            />
          </div>
        ))}
      </div>
      <PaginationControl numberCurrent={propertyData.length} />
    </div>
  );
}
