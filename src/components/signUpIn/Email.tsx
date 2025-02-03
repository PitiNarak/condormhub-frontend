import { Mail } from 'lucide-react';

const Email = () => {
  return (
    <div className="flex justify-center mt-12">
      <div className="bg-gray-400 w-12 h-12 p-3">
        <Mail color="black" />
      </div>

      <input
        name="email"
        placeholder="  Email"
        className="text-black w-4/12 text-xl"
      />
    </div>
  );
};

export default Email;
