import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
export default function Home() {
  return (
    <div className="">
      <h1 className="p-2 text-2xl font-bold">Where do you want to go</h1>
      <div className="block p-2">
        <Link
          href="/register"
          className={buttonVariants({ variant: 'default' })}
        >
          Register Page
        </Link>
      </div>
      <div className="block p-2">
        <Link
          href="/home/lesseeView"
          className={buttonVariants({ variant: 'default' })}
        >
          Lessee Page
        </Link>
      </div>
    </div>
  );
}
