import { User } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Username = () => {
  return (
    <div className="flex justify-center mt-12 items-center">
      <div className="bg-gray-400 w-12 h-12 p-3">
        <User color="black" />
      </div>
      <Input
        name="username"
        placeholder="Username"
        type=""
        className="text-black bg-white w-4/12 text-xl rounded-l-none"
      />
    </div>
  );
};

export default Username;
