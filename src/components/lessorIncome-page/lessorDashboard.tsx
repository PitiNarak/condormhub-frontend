import React from 'react';
import { PropertyDetail } from '@/components/userView/PropertyDetail';
import { mockData } from '@/components/example/mockdata';
import { PropertyI } from '@/types/property';

export default function LessorDashboard() {
  // Parse the mock data
  const properties: PropertyI[] = JSON.parse(mockData);

  // Mocking: if leased properties of 'PitiOwner' (login as 'PitiOwner') are IDs 1-7
  const user = 'PitiOwner';

  const leasedProperties = properties.filter(
    (property) => property.id >= 1 && property.id <= 7 && property.owner == user
  );

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
    (acc, property) => acc + property.price,
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
        {leasedProperties.map((property, index) => (
          <div
            key={String(property.id)}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <PropertyDetail
              id={property.id}
              image={property.image}
              rating={property.rating}
              bedroom={property.bedroom}
              bathroom={property.bathroom}
              province={property.province}
              district={property.district}
              price={property.price}
              propertyName={property.propertyName}
              owner={property.owner}
              size={property.size}
              description={property.description}
            />
            <p className="text-sm text-gray-600 mt-2">
              Leased by:{' '}
              <span className="font-semibold text-blue-500">
                {lesseeNames[index]}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
