import { getServerSession } from "@/shared/utils/getServerSession";
import Image from "next/image";

import { HiMagnifyingGlass } from "react-icons/hi2";
import { BiBell } from "react-icons/bi";
import Profile from "./Profile";

const Header = async () => {
  const session = await getServerSession();

  return (
    <nav className="bg-white py-4 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl flex justify-between items-center">
        <div className="flex items-center w-full">
          <Image
            src="/images/heart.png"
            width={51}
            height={55}
            alt="welcome-image"
            className="mr-2"
          />
          <div>
            <h1 className="text-2xl font-bold">Hello, {session?.user.name}</h1>
            <p className="text-[14px] my-1 text-lightText">
              Let’s start your tasks NOW!
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <HiMagnifyingGlass className="mr-6 text-2xl" />
          <BiBell className="mr-6 text-2xl" />

          <Profile image={session?.user?.image} name={session?.user.name} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
