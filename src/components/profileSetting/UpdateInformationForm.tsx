'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z
    .string()
    .length(10, { message: 'Phone number must be 10 digits long' })
    .regex(/^[0-9]+$/, { message: 'Phone number can only contain digits' }),
  birthday: z.string().date('Birthday must be in YYYY-MM-DD format'),
});

const UpdateInformationForm = ({ session }: { session: Session }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      name: session.user.name,
      phone: '',
      birthday: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    //TODO when submit
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-3xl flex flex-col gap-10"
      >
        <div className="justify-center w-full gap-6 flex flex-col">
          {/* Username Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Username</FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Name</FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 0123456789" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Birthday Field */}
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Birthday</FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormDescription>
                  Format: &quot;YYYY-MM-DD&quot;
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button and Back Button*/}
        </div>
        <div className="flex gap-4">
          <Button type="submit" className="w-44">
            Save Changes
          </Button>
          <Button
            type="button"
            className="w-44 bg-red-500"
            onClick={() => redirect('/profile')}
          >
            {' '}
            {/*redirect to profile page*/}
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateInformationForm;
