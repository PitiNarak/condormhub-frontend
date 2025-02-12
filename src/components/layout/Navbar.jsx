import LanguageSw from '@/components/layout/LanguageSw';
import Link from 'next/link';
import { Bell, Search } from 'lucide-react';
import SelectedMenu from './SelectedMenu';

const Header = () => {
  return (
    <div className="flex shadow-md items-center h-20 fixed top-0 w-full bg-white z-[10000]">
      <div className="text-center flex-row px-[2%]">
        <div className="flex-1">
          <Link href="/">
            <p className="text-lg md:text-xl font-extrabold">ConDormHub</p>
          </Link>
        </div>
        <div className="flex-1">
          <LanguageSw />
        </div>
      </div>
      <div className="sm:flex-[1] md:flex-[2] xl:flex-[3]"></div>
      <div className="flex-[3] flex text-center">
        <SelectedMenu text="Chat" path="/navigation/chat" />
        <SelectedMenu text="Setting" path="/navigation/setting" />
        <SelectedMenu text="Profile" path="/navigation/profile" />
        <div className="flex-1 justify-center m-auto flex">
          <Bell />
        </div>

        <div className="flex-1 justify-center m-auto flex">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Header;
