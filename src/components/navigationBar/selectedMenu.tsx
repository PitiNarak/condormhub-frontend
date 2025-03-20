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
    <div
      className={`flex-1 text-sm md:text-base xl:text-lg text-center font-bold ${path === pathname ? 'underline' : ''}`}
    >
      <Link href={path}>{text}</Link>
    </div>
  );
};
