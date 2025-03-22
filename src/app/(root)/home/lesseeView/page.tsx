import { PropertyScroll } from '@/components/lesseeHome-page/propertyScroll';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const {
    page,
    search,
    minPrice,
    maxPrice,
    district,
    subdistrict,
    province,
    zipcode,
  } = await searchParams;

  const toString = (value: string | string[] | undefined) => {
    return Array.isArray(value) ? value[0] : value;
  };

  const filters = {
    search: toString(search),
    minPrice: toString(minPrice),
    maxPrice: toString(maxPrice),
    district: toString(district),
    subdistrict: toString(subdistrict),
    province: toString(province),
    zipcode: toString(zipcode),
  };

  return (
    <div className="">
      <div className="text-center text-3xl font-bold">
        <p>Properties</p>
      </div>
      <div className="pt-7">
        <PropertyScroll page={page} searchParams={filters} />
      </div>
    </div>
  );
}
