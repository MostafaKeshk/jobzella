"use client";

import Image from "next/image";
import useQuerySearch from "@/hooks/useQuerySearch";
import { useSearchParams } from "next/navigation";
import { group } from "../../_types/group.type";

interface IProps {
  group: group;
}

const GroupItem: React.FC<IProps> = ({ group }) => {
  const { handleAddQuery } = useQuerySearch();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("group");

  const isActive = groupId === group._id;

  return (
    <button
      onClick={() => handleAddQuery("group", group._id)}
      key={group._id}
      className={`p-3 rounded text-lg font-semibold w-full flex items-center ${
        isActive ? "text-black bg-[#e7ebed]" : "text-lightText"
      }`}
    >
      <Image
        src={group.image}
        width={30}
        height={30}
        alt={group.name}
        className="mr-2"
      />
      <span>{group.name}</span>
    </button>
  );
};

export default GroupItem;
