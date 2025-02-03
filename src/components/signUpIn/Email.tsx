import Image from 'next/image';
import icon from '@/media/MailIcon.png';

const Email = () => {
  return (
    <div className="flex justify-center mt-5">
      <div className="bg-gray-400 w-14 h-14">
        <Image src={icon} width={40} height={30} alt="Mail icon" />
      </div>

      <input name="email" placeholder="Email" />
    </div>
  );
};

export default Email;
