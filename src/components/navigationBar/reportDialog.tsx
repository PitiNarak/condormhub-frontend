'use client';
import { report } from '@/actions/support/report';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheckBig } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  message: z.string().min(1, { message: 'Report message is required' }),
});

export const ReportDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await report(values.message);
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
            <p className="text-base">Report submitted</p>
          </div>
        ),
      });
      setOpen(false);
      form.reset();
    }
  }

  return (
    <div className="w-full relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-gray-100">
      <Form {...form}>
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
              form.reset(); // Reset form when dialog is closed
            }
          }}
        >
          <DialogTrigger asChild>
            <p className="w-full hover:cursor-pointer ">Report</p>
          </DialogTrigger>
          <DialogContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
              className="w-full max-w-3xl flex flex-col gap-5"
            >
              <DialogHeader className="items">
                <DialogTitle className="text-2xl text-start">
                  Report problem
                </DialogTitle>
                <DialogDescription></DialogDescription>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Your report message
                      </FormLabel>
                      <FormControl>
                        <Input required {...field} />
                      </FormControl>
                      <FormDescription className="text-start">
                        Your report message will be sent to admin
                      </FormDescription>
                      <FormMessage className="text-start" />
                    </FormItem>
                  )}
                />
              </DialogHeader>
              <DialogFooter className="items-end">
                <Button type="submit" className="w-min">
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </Form>
    </div>
  );
};
