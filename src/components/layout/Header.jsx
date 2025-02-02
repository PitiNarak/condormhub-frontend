import LanguageSw from "../LanguageSw";
import Image from "next/image";
import Logo from "@/media/Logo.png"

const Header = () => {
    return (
        <div className="flex bg-gray-400 text-center items-center rounded-2xl mt-2 h-40">
            <div className="flex-1">
                <LanguageSw></LanguageSw>
            </div>
            <div className="flex-1">
                <a href="/"><Image src={Logo} width={300} height={300} alt="website logo"/></a>
            </div>
        </div>
    );
}

export default Header