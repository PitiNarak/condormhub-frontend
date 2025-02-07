import Link from 'next/link';
import MyForm from '../../../components/signUpIn/RegisterForm';
import { buttonVariants } from '@/components/ui/button';

export default function Page() {
  return (
    <div className="max-w-3xl m-auto">
      <p className="text-center font-bold text-3xl pt-7">Sign Up</p>
      <MyForm />
      <div className="text-center">
        <Link
          href="/login"
          className={`${buttonVariants({ variant: 'outline' })} w-full`}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
