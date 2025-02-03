import { User } from 'lucide-react';

const Username = () => {
  return (
    <div className="flex justify-center mt-12">
      <div className="bg-gray-400 w-12 h-12 p-3">
        <User color="black" />
      </div>
      <input
        name="username"
        placeholder="  Username"
        className="text-black w-4/12 text-xl"
      />
    </div>
  );
};

export default Username;
