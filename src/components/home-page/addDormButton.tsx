'use client';
import React from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const AddDormButton = () => {
  const router = useRouter();
  return (
    <div className="fixed  bottom-3 right-5 w-44 bg-gray-100 border-4 rounded-xl p-1 mb-2 border-black cursor-pointer hover:bg-gray-200 transition-colors duration-200">
      <div
        className="flex justify-center align-middle "
        onClick={() => router.push('/dorm/register')}
      >
        <Plus className="text-black h-8 w-8" />
        <span className="pt-1 pl-1">Add dorminatory</span>
      </div>
    </div>
  );
};
