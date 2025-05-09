import { fetchProperty } from '@/actions/lesseeView/fetchProperty';
import type { components } from '@/types/api';
import { PaginationControl } from '@/components/home-page/paginationControl';
import { redirect } from 'next/navigation';

import { PropertyCard } from '@/components/home-page/propertyCard';
import { SearchBox } from '@/components/home-page/searchBox';

interface PropertyScrollProps {
  page?: number;
  limit?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  district?: string;
  subdistrict?: string;
  province?: string;
  zipcode?: string;
}

export async function PropertyScroll({
  page = 1,
  limit = 12,
  search,
  minPrice,
  maxPrice,
  district,
  subdistrict,
  province,
  zipcode,
}: PropertyScrollProps) {
  const lesseePagePath = '/?page=1';
  const response = await fetchProperty(
    page,
    limit,
    search,
    minPrice,
    maxPrice,
    district,
    subdistrict,
    province,
    zipcode
  );
  const propertyData = 'message' in response ? [] : (response.data ?? []);
  const paginationElement = response.pagination;

  //Range checker if not valid go to first page
  if ((propertyData.length < 0 && page > 1) || page < 1 || Number.isNaN(page)) {
    redirect(lesseePagePath);
  }

  return (
    <div className="mb-10">
      <SearchBox />

      {propertyData.length === 0 ? (
        <p className="text-center text-lg text-gray-500 py-10">
          Sorry, no properties found.
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
                    province={data.address ? (data.address.province ?? '') : ''}
                    district={data.address ? (data.address.district ?? '') : ''}
                    price={data.price ?? 0}
                    propertyName={data.name ?? ''}
                  />
                </div>
              )
            )}
          </div>
          <PaginationControl
            lastPage={Number(paginationElement?.last_page)}
            basePath="/"
          />
        </div>
      )}
    </div>
  );
}
