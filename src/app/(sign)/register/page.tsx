import Email from '@/components/signUpIn/Email';
import Username from '@/components/signUpIn/Username';
import Password from '@/components/signUpIn/Password';
import ConfirmPassword from '@/components/signUpIn/ConfirmPassword';
import Form from 'next/form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="bg-gray-300 text-center pb-10">
      <p className="text-3xl pt-12 font-bold">Sign Up</p>
      <Form action="">
        <Email></Email>
        <Username></Username>
        <Password></Password>
        <ConfirmPassword></ConfirmPassword>
        <Button type="submit" className="">
          Sign Up
        </Button>
        <Link href="/login" className={buttonVariants({ variant: 'outline' })}>
          Login
        </Link>
      </Form>
    </div>
  );
}
