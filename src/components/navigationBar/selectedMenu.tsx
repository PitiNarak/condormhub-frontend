'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface SelectedMenuProp {
  text?: string;
  icon?: React.ReactNode;
  path: string;
}

export const SelectedMenu = ({ text, icon, path }: SelectedMenuProp) => {
  const pathname = usePathname();
  const isSelected = path === pathname;
  return (
    <div
      className={`p-2 ${isSelected ? 'underline' : ''} ${icon && isSelected ? 'bg-primary rounded-full text-primary-foreground' : ''}`}
    >
      <Link href={path}>
        {icon
          ? icon
          : text
            ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
            : 'PLEASE PASS TEXT OR ICON'}
      </Link>
    </div>
  );
};
