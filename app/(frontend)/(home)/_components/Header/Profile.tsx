"use client";
import Image from "next/image";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { signOut } from "next-auth/react";

interface IProps {
  name: string;
  image: string;
}

const Profile: React.FC<IProps> = ({ name, image }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={toggleMenu} className="relative">
      <div className="flex items-center cursor-pointer">
        <Image
          src={image}
          width={50}
          height={50}
          alt={name}
          className="mr-2 rounded-full"
        />
        <BsChevronDown className="text-2xl font-semibold" />
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <p
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer"
            >
              Sign out
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
