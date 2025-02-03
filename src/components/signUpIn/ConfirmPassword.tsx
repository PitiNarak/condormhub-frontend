import { Lock } from 'lucide-react';

const ConfirmPassword = () => {
  return (
    <div className="flex justify-center mt-12">
      <div className="bg-gray-400 w-12 h-12 p-3">
        <Lock color="black" />
      </div>
      <input
        name="confirm_password"
        placeholder="  Confirm Password"
        type="password"
        className="text-black w-4/12 text-xl"
      />
    </div>
  );
};

export default ConfirmPassword;
