import LanguageSw from './LanguageSw';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="flex shadow-md text-center items-center h-24">
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
