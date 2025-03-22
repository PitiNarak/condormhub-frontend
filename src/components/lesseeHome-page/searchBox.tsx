'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Search, Filter, CircleX } from 'lucide-react';

interface SearchBoxProps {
  className?: string;
}

export function SearchBox({ className }: SearchBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize states with URL params if they exist
  const [search, setSearch] = useState(
    searchParams.get('search')?.trim() || ''
  );
  const [minPrice, setMinPrice] = useState(
    searchParams.get('minPrice')?.trim() || ''
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get('maxPrice')?.trim() || ''
  );
  const [province, setProvince] = useState(
    searchParams.get('province')?.trim() || ''
  );
  const [district, setDistrict] = useState(
    searchParams.get('district')?.trim() || ''
  );
  const [subdistrict, setSubdistrict] = useState(
    searchParams.get('subdistrict')?.trim() || ''
  );
  const [zipcode, setZipcode] = useState(
    searchParams.get('zipcode')?.trim() || ''
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Count active filters
  const countActiveFilters = () => {
    let count = 0;
    if (minPrice && maxPrice) count++;
    if (province) count++;
    if (district) count++;
    if (subdistrict) count++;
    if (zipcode) count++;
    return count;
  };

  const [activeFilters, setActiveFilters] = useState(countActiveFilters());

  // Validate price range
  const validatePriceRange = (min: string, max: string) => {
    const newErrors: Record<string, string> = {};

    if ((min && !max) || (!min && max)) {
      newErrors.priceRange = 'Please provide both min and max price';
    }

    if (min && isNaN(parseInt(min))) {
      newErrors.minPrice = 'Min price must be a number';
    }
    if (max && isNaN(parseInt(max))) {
      newErrors.maxPrice = 'Max price must be a number';
    }

    if (min && max && parseInt(min) >= parseInt(max)) {
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
    if (minPrice && maxPrice) {
      params.set('minPrice', minPrice);
      params.set('maxPrice', maxPrice);
    }
    if (province) params.set('province', sanitizeText(province));
    if (district) params.set('district', sanitizeText(district));
    if (subdistrict) params.set('subdistrict', sanitizeText(subdistrict));
    if (zipcode) params.set('zipcode', sanitizeText(zipcode));

    // Navigate to the new URL
    router.push(`/home/lesseeView?${params.toString()}`);
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
    setMinPrice('');
    setMaxPrice('');
    setProvince('');
    setDistrict('');
    setSubdistrict('');
    setZipcode('');
    setErrors({});
  };

  return (
    <div className={`${className} w-full max-w-4xl mx-auto`}>
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
        {/* Search box Container */}
        <div className="relative flex-1 w-full p-4">
          <form onSubmit={handleSubmit} className="flex shadow-sm">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search properties..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <CircleX className="h-5 w-5" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-r-lg transition-colors duration-200 flex items-center justify-center font-medium bg-primary text-white"
            >
              <Search className="h-4 w-4 mr-1" />
              Search
            </button>
          </form>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Dialog.Root open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <Dialog.Trigger asChild>
              <button className="flex items-center bg-white border border-gray-300 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm">
                <Filter className="h-4 w-4 mr-2 text-gray-600" />
                <span className="font-medium">Filters</span>
                {activeFilters > 0 && (
                  <span className="ml-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {activeFilters}
                  </span>
                )}
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-3xl max-h-[85vh] overflow-y-auto">
                <Dialog.DialogTitle></Dialog.DialogTitle>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Filters
                  </h3>
                  <Dialog.Close asChild>
                    <button className="rounded-full p-1 hover:bg-gray-100">
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
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
                        <input
                          type="text"
                          placeholder="Min"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
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
                        <input
                          type="text"
                          placeholder="Max"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
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
                    <input
                      type="text"
                      placeholder="Enter province"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      District
                    </label>
                    <input
                      type="text"
                      placeholder="Enter district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subdistrict
                    </label>
                    <input
                      type="text"
                      placeholder="Enter subdistrict"
                      value={subdistrict}
                      onChange={(e) => setSubdistrict(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zipcode
                    </label>
                    <input
                      type="text"
                      placeholder="Enter zipcode"
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-red-600 px-3 py-2 rounded-lg font-medium flex items-center"
                  >
                    <X className="h-5 w-5 mr-1" />
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={applyFilters}
                    className="bg-primary text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Apply Filters
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
}
