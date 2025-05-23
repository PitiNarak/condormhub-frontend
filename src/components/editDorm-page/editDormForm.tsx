'use client';
import { updateDorm } from '@/actions/editDorm/updateDorm';
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
import { CreateInput } from 'thai-address-autocomplete-react';

const InputThaiAddress = CreateInput();

const formSchema = z.object({
  subdistrict: z.string().min(1, 'Subdistrict is required'),
  district: z.string().min(1, 'District is required'),
  province: z.string().min(1, 'Province is required'),
  zipcode: z
    .string()
    .min(1, 'Zip code is required')
    .regex(/^\d{5}$/, 'Must be a 5-digit number'),
  bedroom: z.coerce
    .number({
      invalid_type_error: 'Must be a number',
    })
    .min(1, 'Number of bedrooms is required'),
  bathroom: z.coerce
    .number({
      invalid_type_error: 'Must be a number',
    })
    .min(1, 'Number of bathrooms is required'),
  size: z.coerce
    .number({
      invalid_type_error: 'Must be a number',
    })
    .min(1, 'Size is required'),
  price: z.coerce
    .number({
      invalid_type_error: 'Must be a number',
    })
    .min(1, 'Price per month is required'),
  description: z.string().min(1, 'Description is required'),
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
      subdistrict: dormInfo.address?.subdistrict || undefined,
      district: dormInfo.address?.district || undefined,
      province: dormInfo.address?.province || undefined,
      zipcode: dormInfo.address?.zipcode || undefined,
      bedroom: dormInfo.bedrooms || undefined,
      bathroom: dormInfo.bathrooms || undefined,
      size: dormInfo.size || undefined,
      price: dormInfo.price || undefined,
      description: dormInfo.description || '',
    },
  });

  useEffect(() => {
    form.reset({
      subdistrict: dormInfo.address?.subdistrict || undefined,
      district: dormInfo.address?.district || undefined,
      province: dormInfo.address?.province || undefined,
      zipcode: dormInfo.address?.zipcode || undefined,
      bedroom: dormInfo.bedrooms || undefined,
      bathroom: dormInfo.bathrooms || undefined,
      size: dormInfo.size || undefined,
      price: dormInfo.price || undefined,
      description: dormInfo.description || '',
    });
  }, [dormInfo, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const res = await updateDorm(values, dormInfo.id, access_token);
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
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="subdistrict"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-sm">Subdistrict</FormLabel>
                <FormControl>
                  <InputThaiAddress.District
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    onSelect={(address) => {
                      form.setValue('subdistrict', address.district);
                      form.setValue('district', address.amphoe);
                      form.setValue('province', address.province);
                      form.setValue('zipcode', address.zipcode);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-sm">District</FormLabel>
                <FormControl>
                  <InputThaiAddress.Amphoe
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    onSelect={(address) => {
                      form.setValue('subdistrict', address.district);
                      form.setValue('district', address.amphoe);
                      form.setValue('province', address.province);
                      form.setValue('zipcode', address.zipcode);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-sm">Province</FormLabel>
                <FormControl>
                  <InputThaiAddress.Province
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    onSelect={(address) => {
                      form.setValue('subdistrict', address.district);
                      form.setValue('district', address.amphoe);
                      form.setValue('province', address.province);
                      form.setValue('zipcode', address.zipcode);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-sm">Zip Code</FormLabel>
                <FormControl>
                  <InputThaiAddress.Zipcode
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    onSelect={(address) => {
                      form.setValue('subdistrict', address.district);
                      form.setValue('district', address.amphoe);
                      form.setValue('province', address.province);
                      form.setValue('zipcode', address.zipcode);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
