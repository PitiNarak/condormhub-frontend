import { cn } from '@/lib/utils';
import React from 'react';

const Divider = ({ className }: React.ComponentPropsWithoutRef<'div'>) => {
  return <div className={cn('border-t border-gray-400 w-5/6', className)} />;
};

export default Divider;
