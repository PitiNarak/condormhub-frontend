import * as React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import PropertyCard from '@/components/userView/PropertyCard';

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export function PropertyScroll() {
  return (
    <ScrollArea className="h-[600px] w-9/12 max-w-[800px] rounded-md border items-center m-auto">
      <div className="p-4">
        <h4 className="mb-4 text-xl font-medium leading-none">No Filters</h4>
        {tags.map((tag) => (
          <>
            <div key={tag} className="text-sm">
              <PropertyCard />
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  );
}
