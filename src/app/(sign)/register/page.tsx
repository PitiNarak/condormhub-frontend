import Form from 'next/form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import InputWithIcon from '@/components/signUpIn/InputWithIconProp';
import { Mail } from 'lucide-react';
import { User } from 'lucide-react';
import { Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-gray-300 text-center pb-10">
      <p className="text-3xl pt-12 font-bold">Sign Up</p>
      <Form action="">
        <InputWithIcon
          icon={<Mail />}
          name={'password'}
          placeholder={'Email'}
          type={'email'}
        />
        <InputWithIcon
          icon={<User />}
          name={'username'}
          placeholder={'Username'}
          type=""
        />
        <InputWithIcon
          icon={<Lock />}
          name={'password'}
          placeholder={'Password'}
          type="password"
        />
        <InputWithIcon
          icon={<Lock />}
          name={'confirm'}
          placeholder={'Confirm Password'}
          type="password"
        />
        <div className="mt-12">
          <Button type="submit" className="mr-10">
            Sign Up
          </Button>
          <Link
            href="/login"
            className={buttonVariants({ variant: 'outline' })}
          >
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
}
