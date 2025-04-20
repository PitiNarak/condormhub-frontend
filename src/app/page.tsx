import { AddDormButton } from '@/components/home-page/addDormButton';
import { PropertyScroll } from '@/components/home-page/propertyScroll';

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

  // Helper function to convert string | string[] | undefined to string
  const toString = (value: string | string[] | undefined): string => {
    return Array.isArray(value) ? value[0] : value || '';
  };

  // Helper function to convert string | string[] | undefined to number
  const toNumber = (
    value: string | string[] | undefined
  ): number | undefined => {
    const strValue = toString(value);
    return strValue ? parseInt(strValue, 10) : undefined;
  };

  // Prepare filters for PropertyScroll
  const filters = {
    page: toNumber(page),
    search: toString(search),
    minPrice: toNumber(minPrice),
    maxPrice: toNumber(maxPrice),
    district: toString(district),
    subdistrict: toString(subdistrict),
    province: toString(province),
    zipcode: toString(zipcode),
  };

  return (
    <div className="relative">
      <PropertyScroll {...filters} />
      <AddDormButton />
    </div>
  );
}
