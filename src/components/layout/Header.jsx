import LanguageSw from './LanguageSw';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="flex bg-gray-400 text-center items-center rounded-2xl mt-2 h-40 mb-2">
      <div className="flex-1">
        <LanguageSw></LanguageSw>
      </div>
      <div className="flex-1">
        <Link href="/">
          <p className="text-5xl font-extrabold">ConDormHub</p>
          <p className="">By PitiNarak</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
