import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className="flex justify-center h-[100vh] border-2 border-gray-950">
      <div className="flex items-center">
        <Link href={'./login'}>
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
