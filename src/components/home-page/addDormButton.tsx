'use client';
import React from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const AddDormButton = () => {
  const router = useRouter();
  return (
    <div className="fixed bottom-2 right-5 border-4 rounded-full p-1 mb-2 border-gray-200 cursor-pointer group hover:border-gray-400 transition-colors duration-200 ">
      <Plus
        className="text-gray-200 h-12 w-12 group-hover:text-gray-400 transition-colors duration-200"
        onClick={() => router.push('/dorm/register')}
      />
    </div>
  );
};
