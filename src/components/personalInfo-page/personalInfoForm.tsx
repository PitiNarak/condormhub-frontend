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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Check, X, CirclePlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { allLifestyleTags, LifestyleTag } from '@/types/allLifestyle';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { sendPersonalInfo } from '@/actions/personalInfo/sendPersonalInfo';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
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
  lifestyles: z.array(z.string()).optional(),
  year: z.string(),
  month: z.string(),
  day: z.string(),
  nationalID: z
    .string()
    .length(13, { message: 'National ID should be 13 digits' })
    .regex(new RegExp(/^[0-9]*/), { message: 'National ID should be number' }),
});

export const UpdateInformationForm = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [selectedTags, setSelectedTags] = useState<LifestyleTag[]>([]);
  const [open, setOpen] = useState(false); // For combo box popover

  // Add or remove a tag
  const toggleTag = (tag: LifestyleTag) => {
    if (selectedTags.some((t) => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Remove a tag from badges
  const removeTag = (tag: LifestyleTag) => {
    setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (session?.access_token) {
      const res = await sendPersonalInfo(session.access_token, {
        ...values,
        lifestyles: selectedTags.map((tag) => tag.name),
      });
      if (res) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: res.message,
        });
      }
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      gender: '',
      phoneNumber: '',
      nationalID: '',
      lifestyles: [],
      year: undefined,
      month: undefined,
      day: undefined,
    },
  });

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
        <div className="justify-center w-full gap-6 grid grid-cols-1 md:grid-cols-2">
          {/* First Name Field */}
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
          {/* National ID Field */}
          <FormField
            control={form.control}
            name="nationalID"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">National ID</FormLabel>
                <FormControl>
                  <Input required {...field} />
                </FormControl>
                <FormDescription>Your thai national ID</FormDescription>
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

          {/* Gender Field */}
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

          {/* Birthday */}
          <div>
            <FormLabel className="font-semibold">Birthdate</FormLabel>
            <div className="mt-[6px] grid grid-cols-[80px_10px_50px_10px_50px] gap-5">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input required placeholder={'YYYY'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-3xl">/</p>
              {/* Month Field use shadcn birthday*/}
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input required placeholder={'MM'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-3xl">/</p>
              {/* Day Field use shadcn birthday*/}
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input required placeholder={'DD'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Lifestyle Tags Field */}
          <FormField
            control={form.control}
            name="lifestyles"
            render={() => (
              <FormItem>
                {/* Lifestyle label and Add (+) button */}
                <div className="flex items-center gap-2">
                  <FormLabel className="font-semibold">Lifestyle</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-gray-700 hover:text-black"
                      >
                        <CirclePlus /> add more
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search lifestyles" />
                        <CommandList>
                          <CommandEmpty>No lifestyles found.</CommandEmpty>
                          <CommandGroup>
                            {allLifestyleTags
                              .filter(
                                (tag) =>
                                  !selectedTags.some((t) => t.id === tag.id)
                              ) // Exclude selected tags
                              .map((tag) => (
                                <CommandItem
                                  key={tag.id}
                                  value={tag.name}
                                  onSelect={() => toggleTag(tag)}
                                >
                                  <Check className="mr-2 h-4 w-4 opacity-0 group-hover:opacity-100" />
                                  {tag.name}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Selected Tags Display */}
                <FormControl>
                  <div className="flex flex-wrap gap-2 p-2 min-h-9 w-full rounded-md border border-input bg-transparent text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag.id}
                        className="px-3 py-1 rounded-lg bg-blue-100 text-blue-500 flex items-center gap-1 hover:bg-blue-200 transition"
                      >
                        {tag.name}
                        <X
                          className="h-3 w-3 cursor-pointer text-blue-500"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button and Back Button */}
        </div>
        <div className="flex gap-4">
          <Button type="submit" className="w-44">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
