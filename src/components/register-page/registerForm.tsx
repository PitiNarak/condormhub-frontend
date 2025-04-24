'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User } from 'lucide-react';
import { useState } from 'react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { InputWithIcon } from '@/components/inputWithIcon/inputWithIcon';
import { signIn } from 'next-auth/react';

const formSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    username: z.string().min(1, { message: 'Username is required' }),
    password: z
      .string()
      .min(5, { message: 'Password must be atleast 5 characters' })
      .max(20, {
        message: 'Password must be no more than 20 chracters',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirmed password is required' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export function MyForm() {
  const [isLoad, setLoad] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoad(true);
    signIn(
      'signup',
      {
        email: values.email,
        password: values.password,
        username: values.username,
        redirect: true,
      },
      { callbackUrl: '/emailVerification' }
    );
    setLoad(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl mx-auto pt-0"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <InputWithIcon
                  placeholder="eg. piti1234@xyz.com"
                  type="text"
                  icon={<Mail />}
                  fields={field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <InputWithIcon
                  placeholder="eg. Piti1234"
                  icon={<User />}
                  type="text"
                  fields={field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputWithIcon
                  placeholder=""
                  type="password"
                  icon={<Lock />}
                  fields={field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <InputWithIcon
                  placeholder=""
                  icon={<Lock />}
                  type="password"
                  fields={field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <p></p>
        </div>
        <div>
          <Button className="w-full mt-3" disabled={isLoad} type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
}
