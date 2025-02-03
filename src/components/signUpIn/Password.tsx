import Image from 'next/image';
import icon from '@/media/PasswordIcon.png';

const Password = () => {
  return (
    <div className="flex justify-center mt-5">
      <div className="bg-gray-400 w-14 h-14">
        <Image src={icon} width={20} height={20} alt="password icon" />
      </div>
      <input name="password" placeholder="Password" type="password" />
    </div>
  );
};

export default Password;
