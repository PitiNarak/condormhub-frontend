'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Hotel } from 'lucide-react';
import { CreateInput } from 'thai-address-autocomplete-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { InputWithIcon } from '@/components/inputWithIcon/inputWithIcon';

const InputThaiAddress = CreateInput();

const formSchema = z.object({
  name: z.string().min(5).max(100),
  price: z.coerce
    .number({
      invalid_type_error: 'Must be a number',
    })
    .min(1000),
  size: z.coerce
    .number({
      invalid_type_error: 'Must be a number',
    })
    .min(1),
  description: z.string().min(10).max(500),
  bedrooms: z.coerce
    .number({
      invalid_type_error: 'Must be a number',
    })
    .min(1),
  bathrooms: z.coerce
    .number({
      invalid_type_error: 'Must be a number',
    })
    .min(1),
  district: z.string().min(1).max(50),
  province: z.string().min(1).max(50),
  subdistrict: z.string().min(1).max(50),
  zipcode: z.string().length(5),
});

void formSchema;

interface FormProb {
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
}

export const DormRegisterForm: React.FC<FormProb> = ({ form }) => {
  return (
    <div>
      <Form {...form}>
        <form onSubmit={() => {}} className="max-w-4xl mx-auto pt-0 space-y-2">
          <h2 className="text-xl font-semibold pt-2">Dormitory information</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      placeholder="Name of your dormitory"
                      type="text"
                      icon={<Hotel />}
                      fields={field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      placeholder="Price of dormitory"
                      type="number"
                      icon={<Hotel />}
                      fields={field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      placeholder="Size of dormitory"
                      type="number"
                      icon={<Hotel />}
                      fields={field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrooms</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      placeholder="Number of bedrooms"
                      type="number"
                      icon={<Hotel />}
                      fields={field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bathrooms</FormLabel>
                  <FormControl>
                    <InputWithIcon
                      placeholder="Number of bathrooms"
                      type="number"
                      icon={<Hotel />}
                      fields={field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <h2 className="text-xl font-semibold pt-2">Dormitory address</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="subdistrict"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-sm">
                    Subdistrict
                  </FormLabel>
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
          <h2 className="text-xl font-semibold pt-2">Dormitory description</h2>
          <div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Description of dormitory"
                      rows={3}
                      className="w-full p-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" // Custom styles
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
