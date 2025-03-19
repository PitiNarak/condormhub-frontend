import { PropertyScroll } from '@/components/lesseeHome-page/propertyScroll';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="">
      <div className="text-center text-3xl font-bold">
        <p>Properties</p>
      </div>
      <div className="pt-7">
        <PropertyScroll searchParams={searchParams} />
      </div>
    </div>
  );
}
