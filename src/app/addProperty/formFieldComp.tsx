import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form'; // Import Control from react-hook-form
import { PropertyFormData } from './addPropertyForm';

interface FormFieldCompProp {
  name: keyof PropertyFormData;
  control: Control<PropertyFormData>;
  placeholder: string;
  type: string;
  icon: React.ReactNode;
  label: string;
}

const FormFieldComp: React.FC<FormFieldCompProp> = ({
  name,
  control,
  placeholder,
  type,
  icon,
  label,
}) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div>
              <div className="relative">
                <div className="absolute left-[6px] top-[6px] h-4 w-4 text-muted-foreground">
                  {icon}
                </div>
                <Input
                  type={type}
                  placeholder={placeholder}
                  className="w-full rounded-lg bg-background pl-9"
                  min={type === 'number' ? 0 : undefined}
                  max={type === 'number' ? Number.MAX_VALUE : undefined}
                  step={type === 'number' ? 1 : undefined}
                  {...field}
                  onChange={
                    type === 'number'
                      ? (e) => field.onChange(parseInt(e.target.value))
                      : (e) => field.onChange(e.target.value)
                  }
                />
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldComp;
