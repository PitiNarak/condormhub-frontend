'use client';
import React from 'react';
import { Plus } from 'lucide-react';
import { redirect } from 'next/navigation';

export const AddDormButton = () => {
  return (
    <div
      className="group flex justify-center items-center border-4 rounded-xl p-6 mb-2 border-gray-300 cursor-pointer"
      onClick={() => redirect('/dorm/register')}
    >
      <Plus className="text-gray-300 h-12 w-12 group-hover:text-gray-400 transition-colors duration-200" />
    </div>
  );
};
