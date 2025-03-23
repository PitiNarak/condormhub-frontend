import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <div className="">
      <Link href="/">
        <Image src="/icon.svg" height={60} width={60} alt={'logo'} />
        {/* <p className="absolute font-extrabold top-12 left-0">ConDormHub</p> */}
      </Link>
    </div>
  );
};
