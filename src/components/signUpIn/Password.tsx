import { Lock } from 'lucide-react';

const Password = () => {
  return (
    <div className="flex justify-center mt-12">
      <div className="bg-gray-400 w-12 h-12 p-3">
        <Lock color="black" />
      </div>
      <input
        name="password"
        placeholder="  Password"
        type="password"
        className="text-black w-4/12 text-xl"
      />
    </div>
  );
};

export default Password;
