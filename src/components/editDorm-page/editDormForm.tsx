'use client';
import { UpdateDorm } from '@/actions/editDorm/updateDorm';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { components } from '@/types/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheckBig } from 'lucide-react';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  //   address: z
  //     .string()
  //     .min(2, { message: 'Username must be at least 2 characters.' }),
  bedroom: z.coerce.number({
    required_error: 'Number of bedrooms is required',
    invalid_type_error: 'Must be a number',
  }),
  bathroom: z.coerce.number({
    required_error: 'Number of bathrooms is required',
    invalid_type_error: 'Must be a number',
  }),
  size: z.coerce.number({
    required_error: 'Size is required',
    invalid_type_error: 'Must be a number',
  }),
  price: z.coerce.number({
    required_error: 'Price per month is required',
    invalid_type_error: 'Must be a number',
  }),
  description: z.string(),
});

type dormInfoType = components['schemas']['dto.DormResponseBody'];

export const EditDormForm = ({
  dormInfo,
  access_token,
}: {
  dormInfo: dormInfoType;
  access_token: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bedroom: dormInfo.bedrooms || undefined,
      bathroom: dormInfo.bathrooms || undefined,
      size: dormInfo.size || undefined,
      price: dormInfo.price || undefined,
      description: dormInfo.description || '',
    },
  });

  useEffect(() => {
    form.reset({
      bedroom: dormInfo.bedrooms || undefined,
      bathroom: dormInfo.bathrooms || undefined,
      size: dormInfo.size || undefined,
      price: dormInfo.price || undefined,
      description: dormInfo.description || '',
    });
  }, [dormInfo, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const res = await UpdateDorm(values, dormInfo.id, access_token);
    if (res?.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: res.error,
      });
    } else {
      toast({
        description: (
          <div className="flex gap-5">
            <CircleCheckBig className="text-green-500" />
            <p className="text-base">Updated successfully</p>
          </div>
        ),
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="w-full flex flex-col gap-10"
      >
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="bedroom"
            render={({ field }) => (
              <FormItem className="w-1/4">
                <FormLabel className="font-semibold">
                  Number of bedrooms:
                </FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathroom"
            render={({ field }) => (
              <FormItem className="w-1/4">
                <FormLabel className="font-semibold">
                  Number of bathrooms:
                </FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem className="w-1/4">
                <FormLabel className="font-semibold">
                  Size (m<sup>2</sup>):
                </FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-1/4">
                <FormLabel className="font-semibold">
                  Price per month:
                </FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Description:</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your dorm"
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button type="submit" className="w-44">
            Save Changes
          </Button>
          <Button
            type="button"
            className="w-44 bg-red-500"
            onClick={() => redirect(`/dorm/${dormInfo.id}`)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
