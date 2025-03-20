'use client';

import React from 'react';
import { PropertyCard } from '@/components/lesseeHome-page/propertyCard';
import { mockData } from '@/mocks/mockProperty';
import { components } from '@/types/api';

export function LessorDashboard() {
  // Parse the mock data
  const properties: components['schemas']['dto.DormResponseBody'][] =
    JSON.parse(mockData);

  // Mocking: if leased properties of 'PitiOwner' (login as 'PitiOwner') are IDs 1-7
  const user = 'PitiOwner';

  // const leasedProperties = properties.filter(
  //   (property) =>
  //     property.id >= '1' && property.id <= '7' && property.owner == user
  // );
  const leasedProperties = properties;

  // Mocking Lessee Name of properties ID = 1-7
  const lesseeNames = [
    'Yoke',
    'Keen',
    'Porsche',
    'Bright',
    'Rak',
    'Peaw',
    'Krit',
  ];

  // Calculate the total income, fee, and final earning
  const totalIncome = leasedProperties.reduce(
    (acc: number, property: components['schemas']['dto.DormResponseBody']) =>
      acc + (property.price ?? 0),
    0
  );
  const feeDeduction = totalIncome * 0.02;
  const finalIncome = totalIncome - feeDeduction;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Income Summary */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-lg text-center">
          <p className="text-gray-500">Total Rent Income</p>
          <p className="text-3xl font-bold text-green-600">
            {totalIncome.toLocaleString()} ฿
          </p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg text-center">
          <p className="text-gray-500">2% Service Fee</p>
          <p className="text-3xl font-bold text-red-500">
            -{feeDeduction.toLocaleString()} ฿
          </p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg text-center">
          <p className="text-gray-500">Your Earnings</p>
          <p className="text-3xl font-bold text-blue-700">
            {finalIncome.toLocaleString()} ฿
          </p>
        </div>
      </div>

      {/* Leased Properties Visualization */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        <span className="text-blue-700">{user}&apos;s</span> Leased Properties
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {leasedProperties.map(
          (
            property: components['schemas']['dto.DormResponseBody'],
            index: number
          ) => (
            <div
              key={String(property.id)}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <PropertyCard
                id={property.id ?? ''}
                image={
                  'https://publics.condormhub.xyz/dorms/c9951243-2d38-4a48-aa5b-0fc680eb078a-d73fa3d7-3f3f-46cc-9a3c-d5afebdc2286.webp'
                }
                rating={property.rating ?? 0}
                bedroom={property.bedrooms ?? 0}
                bathroom={property.bathrooms ?? 0}
                province={
                  property.address ? (property.address.province ?? '') : ''
                }
                district={
                  property.address ? (property.address.district ?? '') : ''
                }
                price={property.price ?? 0}
                propertyName={property.name ?? ''}
              />
              <p className="text-sm text-gray-600 mt-2">
                Leased by:{' '}
                <span className="font-semibold text-blue-500">
                  {lesseeNames[index]}
                </span>
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
