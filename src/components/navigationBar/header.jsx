import LanguageSw from '@/components/navigationBar/languageSw';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="flex shadow-md text-center items-center h-20">
      <div className="flex-1">
        <Link href="/">
          <p className="text-3xl font-extrabold">ConDormHub</p>
        </Link>
      </div>
      <div className="flex-1">
        <LanguageSw />
      </div>
    </div>
  );
};

export default Header;
