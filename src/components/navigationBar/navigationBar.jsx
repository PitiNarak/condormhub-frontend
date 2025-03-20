import { LanguageSw } from '@/components/navigationBar/languageSw';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { SelectedMenu } from '@/components/navigationBar/selectedMenu';
import { NotiBtn } from '@/components/navigationBar/notificationButton';

export const NavBar = () => {
  return (
    <div className="flex shadow-md items-center h-20 fixed top-0 w-full bg-white z-[50]">
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
        <SelectedMenu text="Setting" path="/setting" />
        <SelectedMenu text="Profile" path="/profile/myProfile" />
        <div className="flex-1 justify-center m-auto flex">
          <NotiBtn />
        </div>

        <div className="flex-1 justify-center m-auto flex">
          <Search />
        </div>
      </div>
    </div>
  );
};
