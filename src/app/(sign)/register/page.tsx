import Email from '@/components/signUpIn/Email';
import Username from '@/components/signUpIn/Username';
import Password from '@/components/signUpIn/Password';
import ConfirmPassword from '@/components/signUpIn/ConfirmPassword';
import Form from 'next/form';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-300 text-center pb-10">
      <p className="text-black text-2xl">Sign Up</p>
      <Form action="">
        <Email></Email>
        <Username></Username>
        <Password></Password>
        <ConfirmPassword></ConfirmPassword>
        <button
          type="submit"
          className="text-black mt-5 bg-gray-400 w-5/12 rounded-full block m-auto"
        >
          Sign Up
        </button>
        <Link
          href="/login"
          className="text-black mt-5 bg-transparent border border-gray-400 w-5/12 rounded-full block m-auto"
        >
          Login
        </Link>
      </Form>
    </div>
  );
}
