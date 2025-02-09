import LanguageSw from '@/components/layout/LanguageSw';
import Link from 'next/link';
import { Bell, Search } from 'lucide-react';
import SelectedMenu from './SelectedMenu';

const Header = () => {
  return (
    <div className="flex shadow-md items-center h-20">
      <div className="text-center flex-row px-[2%]">
        <div className="flex-1">
          <Link href="/">
            <p className="text-xl font-extrabold">ConDormHub</p>
          </Link>
        </div>
        <div className="flex-1">
          <LanguageSw />
        </div>
      </div>
      <div className="flex-[4] flex">
        <SelectedMenu text="Chat" path="/navigation/chat" />
        <SelectedMenu text="Setting" path="/navigation/setting" />
        <div className="flex-[5] flex text-center">
          <div className="flex-[1]"></div>
          <div className="flex-1 justify-end m-auto flex">
            <div className="">
              <Bell />
            </div>
          </div>
          <SelectedMenu text="Profile" path="/navigation/profile" />
          <div className="pr-[2%]">
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
