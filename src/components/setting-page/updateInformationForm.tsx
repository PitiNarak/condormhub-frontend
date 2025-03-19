'use client';
import { zodResolver } from '@hookform/resolvers/zod';
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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect } from 'react';
import { CircleCheckBig } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { UpdateUserInformation } from '@/actions/setting/action';

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' }),
  firstname: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters.' }),
  lastname: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters.' }),
  phoneNumber: z
    .string()
    .startsWith('0', { message: 'Phone number must start with 0' }),
  gender: z.string().min(1, { message: 'Gender must be selected' }),
});

const UpdateInformationForm = () => {
  const { data: session, update } = useSession();
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    //TODO when submit
    console.log(values);
    if (session?.access_token) {
      const res = await UpdateUserInformation(session.access_token, values);
      if (res?.error) {
        console.log(res.error);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: res.error,
        });
      } else {
        update({
          user: {
            ...session.user,
            username: values.username,
            firstname: values.firstname,
            lastname: values.lastname,
            gender: values.gender,
            phoneNumber: values.phoneNumber,
          },
        });
        console.log('success');
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
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: session?.user?.username || '',
      firstname: session?.user?.firstname || '',
      lastname: session?.user?.lastname || '',
      gender: session?.user?.gender || '',
      phoneNumber: session?.user?.phoneNumber || '',
    },
  });

  useEffect(() => {
    if (session?.access_token) {
      form.reset({
        username: session.user?.username || '',
        firstname: session.user?.firstname || '',
        lastname: session.user?.lastname || '',
        gender: session.user?.gender || '',
        phoneNumber: session.user?.phoneNumber || '',
      });
    }
  }, [session, form]);

  const formatPhoneNumber = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');

    // Format as xxx-xxx-xxxx
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

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
          {/* First name Field */}
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">First name</FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Last name Field */}
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Last name</FormLabel>
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., 012-345-6789"
                    required
                    value={field.value}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      field.onChange(formatted);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Birthday Field */}
          {/* <FormField
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
          /> */}

          {/* gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Gender</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
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
