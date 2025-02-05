import { Input } from '../ui/input';

interface InputWithIconProp {
  icon: React.ReactNode;
  label?: string;
  name: string;
  placeholder: string;
  type: string;
}

const InputWithIcon = ({
  icon,
  label,
  name,
  placeholder,
  type,
}: InputWithIconProp) => {
  return (
    <div className="w-2/12 justify-center m-auto mt-12">
      <label htmlFor={name}>{label}</label>
      <div className="relative">
        <div className="absolute left-1 top-1 h-4 w-4 text-muted-foreground">
          {icon}
        </div>
        <Input
          type={type}
          placeholder={placeholder}
          className="w-full rounded-lg bg-background pl-10"
        />
      </div>
    </div>
  );
};

export default InputWithIcon;
