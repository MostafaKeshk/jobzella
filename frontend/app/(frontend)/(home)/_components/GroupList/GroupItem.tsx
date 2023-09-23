"use client";

import useQuerySearch from "@/hooks/useQuerySearch";

interface IProps {
  group: {
    _id: string;
    name: string;
  };
  isActive: boolean;
}

const GroupItem: React.FC<IProps> = ({ group, isActive }) => {
  const { handleAddQuery } = useQuerySearch();
  return (
    <button
      onClick={() => handleAddQuery("group", group._id)}
      key={group._id}
      className={`block p-3 rounded text-lg font-semibold  ${
        isActive ? "text-black bg-[#e7ebed]" : "text-lightText"
      }`}
    >
      {group.name}
    </button>
  );
};

export default GroupItem;
