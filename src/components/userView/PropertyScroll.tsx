import { PropertyDetail } from '@/components/userView/PropertyDetail';
import { mockData } from '../example/mockdata';
import { PropertyI } from '@/types/property';

export function PropertyScroll() {
  const propertyData = JSON.parse(mockData);
  return (
    <div className="shadow-md border border-gray-100 pt-14 pb-12">
      <p className="block text-center text-lg w-[150px] mb-8 ml-2 rounded-2xl border border-gray-400">
        No Filters
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-5">
        {propertyData.map((data: PropertyI) => (
          <div key={String(data.id)} className="text-sm">
            <PropertyDetail
              id={data.id}
              image={data.image}
              rating={data.rating}
              bedroom={data.bedroom}
              bathroom={data.bathroom}
              province={data.province}
              district={data.district}
              price={data.price}
              propertyName={data.propertyName}
              owner={data.owner}
              size={data.size}
              description={data.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
