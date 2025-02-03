import Image from 'next/image';
import icon from '@/media/UserIcon.png';

const Username = () => {
  return (
    <div className="flex justify-center mt-5">
      <div className="bg-gray-400 w-14 h-14">
        <Image src={icon} width={40} height={30} alt="User icon" />
      </div>
      <input name="username" placeholder="Username" />
    </div>
  );
};

export default Username;
