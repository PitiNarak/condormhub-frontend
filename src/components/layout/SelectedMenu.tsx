'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface SelectedMenuProp {
  text: string;
  path: string;
}

const SelectedMenu = ({ text, path }: SelectedMenuProp) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div
      className={`flex-1 text-sm xl:text-base pr-5 text-center ${path === pathname ? 'underline' : ''}`}
    >
      <Link href={path}>{text}</Link>
    </div>
  );
};

export default SelectedMenu;
