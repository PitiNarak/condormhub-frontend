import Link from 'next/link';
import MyForm from '../../../components/signUpIn/RegisterForm';
import { buttonVariants } from '@/components/ui/button';

export default function Page() {
  return (
    <div>
      <MyForm />
      <div className="text-center">
        <Link
          href="/login"
          className={`${buttonVariants({ variant: 'outline' })} w-4/12`}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
