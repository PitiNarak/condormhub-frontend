'use client';
import React from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const AddDormButton = () => {
  const router = useRouter();
  return (
    <div className="fixed  bottom-3 right-5 w-44 bg-gray-950 border-gray-950 border-4 rounded-xl p-1 mb-2 cursor-pointer hover:bg-gray-800 transition-colors duration-200 hover:border-gray-800">
      <div
        className="flex justify-center align-middle "
        onClick={() => router.push('/dorm/register')}
      >
        <Plus className="text-white h-8 w-8" />
        <span className="pt-1 pl-1 text-white">Add dormitory</span>
      </div>
    </div>
  );
};
