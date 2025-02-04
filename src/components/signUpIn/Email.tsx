import { Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Email = () => {
  return (
    <div className="flex justify-center mt-12 items-center">
      <div className="bg-gray-400 w-12 h-12 p-3">
        <Mail color="black" />
      </div>

      <Input
        name="email"
        placeholder="Email"
        type="email"
        className="text-black bg-white w-4/12 text-xl rounded-l-none"
      />
    </div>
  );
};

export default Email;
