import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div className="mt-5 text-center">
      <p className="text-3xl">This is login page</p>
      <Button className="mt-5">
        <Link href="/register">To register</Link>
      </Button>
    </div>
  );
}
