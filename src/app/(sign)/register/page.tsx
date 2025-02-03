import Email from '@/components/signUpIn/Email';
import Username from '@/components/signUpIn/Username';
import Password from '@/components/signUpIn/Password';
import ConfirmPassword from '@/components/signUpIn/ConfirmPassword';
import Form from 'next/form';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-300 text-center pb-10">
      <p className="text-black text-3xl pt-12 font-bold">Sign Up</p>
      <Form action="">
        <Email></Email>
        <Username></Username>
        <Password></Password>
        <ConfirmPassword></ConfirmPassword>
        <button
          type="submit"
          className="text-xl text-black font-semibold hover:bg-black hover:text-white mt-12 bg-gray-400 py-1 w-5/12 rounded-full block m-auto"
        >
          Sign Up
        </button>
        <Link
          href="/login"
          className="text-xl text-black font-semibold hover:bg-black hover:text-white hover:border-0 mt-12 bg-transparent border border-gray-400 py-1 w-5/12 rounded-full block m-auto"
        >
          Login
        </Link>
      </Form>
    </div>
  );
}
