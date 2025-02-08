import { Input } from '../ui/input';

interface InputWithIconProp {
  icon: React.ReactNode;
  placeholder: string;
  type: string;
  fields: React.HtmlHTMLAttributes<HTMLInputElement>;
}

const InputWithIcon = ({
  icon,
  placeholder,
  type,
  fields,
}: InputWithIconProp) => {
  return (
    <div>
      <div className="relative">
        <div className="absolute left-[6px] top-[6px] h-4 w-4 text-muted-foreground">
          {icon}
        </div>
        <Input
          type={type}
          placeholder={placeholder}
          className="w-full rounded-lg bg-background pl-9"
          {...fields}
        />
      </div>
    </div>
  );
};

export default InputWithIcon;
