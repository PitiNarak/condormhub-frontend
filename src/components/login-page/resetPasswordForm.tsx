'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import InputWithIcon from '@/components/inputWithIcon/inputWithIcon';
import { useState } from 'react';

const formSchema = z
  .object({
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

export default function ResetPasswordForm() {
  const [isDisabled, setIsDisabled] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      //TODO sent a password to backend
      setIsDisabled(true);
      alert('Your password has been reseted.');
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
          <Button className="w-full mt-3" type="submit" disabled={isDisabled}>
            {isDisabled ? 'Password Reset!' : 'Confirm'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
