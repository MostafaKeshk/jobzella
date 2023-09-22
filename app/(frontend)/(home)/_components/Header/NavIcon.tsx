"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

import { useStore } from "@/store";

const NavIcon = () => {
  const { openNav } = useStore();
  return (
    <button
      className="md:hidden"
      onClick={() =>
        useStore.setState((state) => {
          console.log(state.openNav);
          return {
            openNav: !state.openNav,
          };
        })
      }
    >
      {openNav ? (
        <AiOutlineClose className="text-2xl mr-2" />
      ) : (
        <GiHamburgerMenu className="text-2xl mr-2" />
      )}
    </button>
  );
};

export default NavIcon;
