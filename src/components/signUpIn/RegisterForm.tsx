'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Mail, Lock, User } from 'lucide-react';
import { sendRegistration } from './action';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import InputWithIcon from '@/components/signUpIn/InputWithIconProp';

const formSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    username: z.string().min(1).max(20),
    password: z.string().min(5).max(20),
    confirmPassword: z.string().min(5).max(20),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });

export default function MyForm() {
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
    console.log(values);
    try {
      const result = await sendRegistration(values);
      if (result && result.message) {
        console.log(result.message);
      }
    } catch (e: unknown) {
      console.log(e);
    }
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
          <Button className="w-full mt-3" type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
}
