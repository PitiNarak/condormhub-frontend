'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Search, Filter, CircleX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize states with URL params if they exist
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [minPrice, setMinPrice] = useState<number | undefined>(
    searchParams.get('minPrice')
      ? Number(searchParams.get('minPrice'))
      : undefined
  );
  const [maxPrice, setMaxPrice] = useState<number | undefined>(
    searchParams.get('maxPrice')
      ? Number(searchParams.get('maxPrice'))
      : undefined
  );
  const [province, setProvince] = useState(searchParams.get('province') || '');
  const [district, setDistrict] = useState(searchParams.get('district') || '');
  const [subdistrict, setSubdistrict] = useState(
    searchParams.get('subdistrict') || ''
  );
  const [zipcode, setZipcode] = useState(searchParams.get('zipcode') || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Count active filters
  const countActiveFilters = () => {
    let count = 0;
    if (minPrice !== undefined && maxPrice !== undefined) count++;
    if (province) count++;
    if (district) count++;
    if (subdistrict) count++;
    if (zipcode) count++;
    return count;
  };

  const [activeFilters, setActiveFilters] = useState(countActiveFilters());

  // Validate price range
  const validatePriceRange = (
    min: number | undefined,
    max: number | undefined
  ) => {
    const newErrors: Record<string, string> = {};

    if (
      (min !== undefined && max === undefined) ||
      (min === undefined && max !== undefined)
    ) {
      newErrors.priceRange = 'Please provide both min and max price';
    }

    if (min !== undefined && isNaN(min)) {
      newErrors.minPrice = 'Min price must be a number';
    }
    if (max !== undefined && isNaN(max)) {
      newErrors.maxPrice = 'Max price must be a number';
    }

    if (min !== undefined && max !== undefined && min >= max) {
      newErrors.priceRange = 'Min price must be less than max price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Sanitize text input
  const sanitizeText = (text: string): string => {
    return text.replace(/[<>&"']/g, '');
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate price range
    if (!validatePriceRange(minPrice, maxPrice)) {
      return;
    }

    // Create new URLSearchParams
    const params = new URLSearchParams();
    params.set('page', '1');

    // Add search parameters if they have values
    if (search) params.set('search', sanitizeText(search));
    if (minPrice !== undefined && maxPrice !== undefined) {
      params.set('minPrice', minPrice.toString());
      params.set('maxPrice', maxPrice.toString());
    }
    if (province) params.set('province', sanitizeText(province));
    if (district) params.set('district', sanitizeText(district));
    if (subdistrict) params.set('subdistrict', sanitizeText(subdistrict));
    if (zipcode) params.set('zipcode', sanitizeText(zipcode));

    // Navigate to the new URL
    router.push(`/?${params.toString()}`);
  };

  // Apply filters from the filter panel
  const applyFilters = () => {
    // Validate price range
    if (!validatePriceRange(minPrice, maxPrice)) {
      return;
    }

    // Close filter panel
    setIsFilterOpen(false);

    // Update active filters count
    setActiveFilters(countActiveFilters());

    // Submit the form programmatically
    handleSubmit(new Event('submit') as unknown as React.FormEvent);
  };

  // Clear all filters
  const clearFilters = () => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setProvince('');
    setDistrict('');
    setSubdistrict('');
    setZipcode('');
    setErrors({});
  };

  return (
    <div className="mx-auto px-16 md:px-32">
      <div className="flex items-center gap-1 mb-4">
        {/* Search box Container */}
        <div className="relative flex-1 w-full p-1">
          <form onSubmit={handleSubmit} className="flex shadow-sm">
            <div className="relative flex-1">
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search properties..."
                className="rounded-r-none"
              />
              {search && (
                <Button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    const params = new URLSearchParams(searchParams.toString());

                    // Reset search query only
                    params.delete('search');
                    params.set('page', '1');

                    router.push(`/?${params.toString()}`);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 rounded-full"
                  variant="ghost"
                  size="icon"
                >
                  <CircleX className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button type="submit" className="rounded-l-none">
              <Search className="h-4 w-4 mr-1" />
              <span className="hidden md:block">Search</span>
            </Button>
          </form>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Dialog.Root open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <Dialog.Trigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="hidden md:block">Filters</span>
                {activeFilters > 0 && (
                  <span className="ml-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {activeFilters}
                  </span>
                )}
              </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
                <Dialog.DialogTitle></Dialog.DialogTitle>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Filters
                  </h3>
                  <Dialog.Close asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full p-1 hover:bg-gray-100"
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </Button>
                  </Dialog.Close>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          ฿
                        </span>
                        <Input
                          type="number"
                          placeholder="Min"
                          value={minPrice ?? ''}
                          onChange={(e) => {
                            const value = e.target.value
                              ? Number(e.target.value)
                              : undefined;
                            if (value === undefined || value >= 0) {
                              setMinPrice(value);
                            }
                          }}
                          className={`w-full pl-7 pr-3 py-2 rounded-lg focus:outline-none border border-gray-300`}
                          aria-invalid={
                            !!errors.minPrice || !!errors.priceRange
                          }
                        />
                      </div>
                      <span className="text-gray-500">to</span>
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          ฿
                        </span>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={maxPrice ?? ''}
                          onChange={(e) => {
                            const value = e.target.value
                              ? Number(e.target.value)
                              : undefined;
                            if (value === undefined || value >= 0) {
                              setMaxPrice(value);
                            }
                          }}
                          className={`w-full pl-7 pr-3 py-2 rounded-lg focus:outline-none border border-gray-300`}
                          aria-invalid={
                            !!errors.maxPrice || !!errors.priceRange
                          }
                        />
                      </div>
                    </div>
                    {errors.priceRange && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.priceRange}
                      </p>
                    )}
                    {errors.minPrice && !errors.priceRange && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.minPrice}
                      </p>
                    )}
                    {errors.maxPrice && !errors.priceRange && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.maxPrice}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Province
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter province"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      District
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subdistrict
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter subdistrict"
                      value={subdistrict}
                      onChange={(e) => setSubdistrict(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zipcode
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter zipcode"
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    onClick={clearFilters}
                    variant="ghost"
                    className="px-3 py-2 rounded-lg font-medium flex items-center"
                  >
                    <X className="h-5 w-5 mr-1" />
                    Clear All
                  </Button>
                  <Button
                    type="button"
                    onClick={applyFilters}
                    className="bg-primary text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Apply Filters
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
}
