"use client";

import useCreateQuerySearch from "@/hooks/useQuerySearch";
import { IoMdAddCircleOutline } from "react-icons/io";

type IProps = {
  text: string;
  queryKey: string;
  className?: string;
};

const AddButton: React.FC<IProps> = ({ text, queryKey, className }) => {
  const { handleAddQuery } = useCreateQuerySearch();
  return (
    <button
      className={`flex justify-center items-center bg-primary rounded-xl py-3 text-white  disabled:bg-lightPrimary hover:bg-primaryBold transition ${className}`}
      onClick={() => handleAddQuery(queryKey, "true")}
    >
      <IoMdAddCircleOutline className="mr-1 text-xl" />
      {text}
    </button>
  );
};

export default AddButton;
