"use client";

import useCreateQuerySearch from "@/hooks/useQuerySearch";
import { IoMdAddCircleOutline } from "react-icons/io";

type IProps = {
  queryKey: string;
};

const AddTaskButton: React.FC<IProps> = ({ queryKey }) => {
  const { handleAddQuery } = useCreateQuerySearch();
  return (
    <div
      className="rounded border-dashed border-gray-400 border-2 p-4 flex justify-center cursor-pointer"
      onClick={() => handleAddQuery(queryKey, "true")}
    >
      <IoMdAddCircleOutline className="text-3xl text-primary" />
    </div>
  );
};

export default AddTaskButton;
