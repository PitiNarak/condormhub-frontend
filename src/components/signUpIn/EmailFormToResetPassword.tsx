'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';

const formSchema = z.object({
  email: z.string().email({ message: 'Input must be in Email format' }),
});

export function SendResetEmail() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsDisabled(true);
      setCountdown(10); // Start countdown from 10 seconds

      // Start countdown timer
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Send request to backend
      const response = await fetch('http://localhost:3000/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset email');
      }

      alert('Reset link sent! Check your email.');
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
      setIsDisabled(false); // Re-enable button on failure
      setCountdown(0);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="piti1234@xyz.com"
                    id="email"
                    type="email"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isDisabled}>
            {isDisabled ? `Resend in ${countdown}s` : 'Send Reset Link'}
          </Button>
        </div>
        <div className="mt-4 text-center text-md">
          <a href="/login" className="hover:underline">
            Back
          </a>
        </div>
      </form>
    </Form>
  );
}
