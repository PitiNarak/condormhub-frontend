import PropertyCard from './PropertyCard';
const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export function PropertyScroll() {
  return (
    <div className="shadow-md border border-gray-100 pt-14 pb-12">
      <p className="block text-center text-lg w-[150px] mb-8 ml-2 rounded-2xl border border-gray-400">
        No Filters
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-5">
        {tags.map((tag) => (
          <>
            <div key={tag} className="text-sm">
              <PropertyCard />
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
