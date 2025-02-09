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

const formSchema = z.object({
  name: z.string(),
  phone: z
    .string()
    .length(10, { message: 'Phone number must be 10 digits long' })
    .regex(/^[0-9]+$/, { message: 'Phone number can only contain digits' }),
  birthday: z.string().date('Birthday must be in YYYY-MM-DD format'),
  province: z.string(),
  district: z.string(),
  subDistrict: z.string(),
  postalCode: z.string(),
});

const UpdateInformationForm = ({ session }: { session: Session }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session.user.name,
      phone: '',
      birthday: '',
      province: '',
      district: '',
      subDistrict: '',
      postalCode: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="w-full flex flex-col justify-center items-center gap-10"
      >
        <div className="md:grid md:grid-cols-2 justify-center w-max gap-6 flex flex-col">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-96">
                <FormLabel className="font-semibold">Name</FormLabel>
                <FormControl>
                  <Input id="name" type="name" required {...field} />
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
              <FormItem className="w-96">
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
              <FormItem className="w-96">
                <FormLabel className="font-semibold">Birthday</FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormDescription>YYYY-MM-DD</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Province Field */}
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem className="w-96">
                <FormLabel className="font-semibold">Province</FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* District Field */}
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem className="w-96">
                <FormLabel className="font-semibold">District</FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sub-District Field */}
          <FormField
            control={form.control}
            name="subDistrict"
            render={({ field }) => (
              <FormItem className="w-96">
                <FormLabel className="font-semibold">Sub-District</FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Postal Code Field */}
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="w-96">
                <FormLabel className="font-semibold">Postal Code</FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
        </div>
        <Button type="submit" className="w-44">
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default UpdateInformationForm;
