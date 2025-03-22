'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Search, Filter, CircleX } from 'lucide-react';

interface SearchBoxProps {
  className?: string;
}

export function SearchBox({ className }: SearchBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize states with URL params if they exist, with proper sanitization
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
  const [activeFilters, setActiveFilters] = useState(countActiveFilters());

  // Create temp states for the filter panel
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
  const [tempProvince, setTempProvince] = useState(province);
  const [tempDistrict, setTempDistrict] = useState(district);
  const [tempSubdistrict, setTempSubdistrict] = useState(subdistrict);
  const [tempZipcode, setTempZipcode] = useState(zipcode);
  const [tempErrors, setTempErrors] = useState<Record<string, string>>({});

  // Validate price range
  const validatePriceRange = (min: string, max: string) => {
    const newErrors: Record<string, string> = {};

    // Check if only one of min or max is provided
    if ((min && !max) || (!min && max)) {
      newErrors.priceRange = 'Please provide both min and max price';
    }

    // Check if min and max are valid numbers
    if (min && isNaN(parseInt(min))) {
      newErrors.minPrice = 'Min price must be a number';
    }
    if (max && isNaN(parseInt(max))) {
      newErrors.maxPrice = 'Max price must be a number';
    }

    // Check if min is less than max
    if (min && max && parseInt(min) >= parseInt(max)) {
      newErrors.priceRange = 'Min price must be less than max price';
    }

    setTempErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Initialize temp states when filter opens
  useEffect(() => {
    if (isFilterOpen) {
      // Set default values for minPrice and maxPrice if they are empty
      setTempMinPrice(minPrice);
      setTempMaxPrice(maxPrice);
      setTempProvince(province);
      setTempDistrict(district);
      setTempSubdistrict(subdistrict);
      setTempZipcode(zipcode);
      setTempErrors({});
    }
  }, [
    isFilterOpen,
    minPrice,
    maxPrice,
    province,
    district,
    subdistrict,
    zipcode,
  ]);

  // Sanitize text input
  const sanitizeText = (text: string): string => {
    return text.replace(/[<>&"']/g, '');
  };

  // Handle text input changes with sanitization
  const handleTextChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(sanitizeText(value));
  };

  // Handle price input changes
  const handlePriceChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    // Only allow non-negative numbers
    if (value === '' || /^\d+$/.test(value)) {
      setter(value);
    }
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new URLSearchParams
    const params = new URLSearchParams();

    // Always set page to 1 when searching or filtering
    params.set('page', '1');

    // Add search parameters if they have values
    if (search) params.set('search', search);

    // Only set minPrice and maxPrice if both are provided
    if (minPrice && maxPrice) {
      params.set('minPrice', minPrice);
      params.set('maxPrice', maxPrice);
    }

    if (province) params.set('province', province);
    if (district) params.set('district', district);
    if (subdistrict) params.set('subdistrict', subdistrict);
    if (zipcode) params.set('zipcode', zipcode);

    // Navigate to the new URL
    router.push(`/home/lesseeView?${params.toString()}`);
  };

  // Apply filters from the filter panel
  const applyFilters = () => {
    // Validate price range before proceeding
    if (!validatePriceRange(tempMinPrice, tempMaxPrice)) {
      return; // Don't proceed if validation fails
    }

    // Create new URLSearchParams
    const params = new URLSearchParams();

    // Always set page to 1 when searching or filtering
    params.set('page', '1');

    // Add search parameters if they have values
    if (search) params.set('search', search);

    // Only set minPrice and maxPrice if both are provided
    if (tempMinPrice && tempMaxPrice) {
      params.set('minPrice', tempMinPrice);
      params.set('maxPrice', tempMaxPrice);
    }

    if (tempProvince) params.set('province', tempProvince);
    if (tempDistrict) params.set('district', tempDistrict);
    if (tempSubdistrict) params.set('subdistrict', tempSubdistrict);
    if (tempZipcode) params.set('zipcode', tempZipcode);

    // Navigate to the new URL
    router.push(`/home/lesseeView?${params.toString()}`);

    // Apply temp states to actual states
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setProvince(tempProvince);
    setDistrict(tempDistrict);
    setSubdistrict(tempSubdistrict);
    setZipcode(tempZipcode);

    // Close filter panel
    setIsFilterOpen(false);

    // Update active filters count
    setActiveFilters(
      countActiveFilters(
        tempMinPrice,
        tempMaxPrice,
        tempProvince,
        tempDistrict,
        tempSubdistrict,
        tempZipcode
      )
    );
  };

  // Clear all filters within filter panel
  const clearFilters = () => {
    setTempMinPrice('');
    setTempMaxPrice('');
    setTempProvince('');
    setTempDistrict('');
    setTempSubdistrict('');
    setTempZipcode('');
    setTempErrors({});
  };

  // Count active filters
  function countActiveFilters(
    min = minPrice,
    max = maxPrice,
    prov = province,
    dist = district,
    subdist = subdistrict,
    zip = zipcode
  ) {
    let count = 0;

    // Count min and max price as one filter set if both are provided
    if (min && max) {
      count++;
    }

    if (prov) count++;
    if (dist) count++;
    if (subdist) count++;
    if (zip) count++;

    return count;
  }

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
                onChange={(e) => handleTextChange(setSearch, e.target.value)}
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
                <Dialog.Title></Dialog.Title>
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
                          value={tempMinPrice}
                          onChange={(e) => {
                            handlePriceChange(setTempMinPrice, e.target.value);
                          }}
                          className={`w-full pl-7 pr-3 py-2 border ${tempErrors.minPrice || tempErrors.priceRange ? 'border-error' : 'border-gray-300'} rounded-lg focus:outline-none`}
                          aria-invalid={
                            !!tempErrors.minPrice || !!tempErrors.priceRange
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
                          value={tempMaxPrice}
                          onChange={(e) => {
                            handlePriceChange(setTempMaxPrice, e.target.value);
                          }}
                          className={`w-full pl-7 pr-3 py-2 border ${tempErrors.maxPrice || tempErrors.priceRange ? 'border-error' : 'border-gray-300'} rounded-lg focus:outline-none`}
                          aria-invalid={
                            !!tempErrors.maxPrice || !!tempErrors.priceRange
                          }
                        />
                      </div>
                    </div>
                    {tempErrors.priceRange && (
                      <p className="text-sm text-error text-red-600 mt-1">
                        {tempErrors.priceRange}
                      </p>
                    )}
                    {tempErrors.minPrice && !tempErrors.priceRange && (
                      <p className="text-sm text-error text-red-600 mt-1">
                        {tempErrors.minPrice}
                      </p>
                    )}
                    {tempErrors.maxPrice && !tempErrors.priceRange && (
                      <p className="text-sm text-error text-red-600 mt-1">
                        {tempErrors.maxPrice}
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
                      value={tempProvince}
                      onChange={(e) =>
                        handleTextChange(setTempProvince, e.target.value)
                      }
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
                      value={tempDistrict}
                      onChange={(e) =>
                        handleTextChange(setTempDistrict, e.target.value)
                      }
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
                      value={tempSubdistrict}
                      onChange={(e) =>
                        handleTextChange(setTempSubdistrict, e.target.value)
                      }
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
                      value={tempZipcode}
                      onChange={(e) => {
                        handleTextChange(setTempZipcode, e.target.value);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-error px-3 py-2 rounded-lg font-medium flex items-center"
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
