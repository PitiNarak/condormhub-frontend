'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface SelectedMenuProp {
  text: string;
  path: string;
}

export const SelectedMenu = ({ text, path }: SelectedMenuProp) => {
  const pathname = usePathname();
  // console.log(pathname);
  return (
    <div className={`${path === pathname ? 'underline' : ''}`}>
      <Link href={path}>
        {text.charAt(0).toUpperCase()}
        {text.slice(1).toLowerCase()}
      </Link>
    </div>
  );
};
