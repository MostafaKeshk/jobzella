import Link from "next/link";

const GroupItem = ({ group, isActive }: any) => {
  return (
    <Link
      href={`/?group=${group._id}`}
      key={group._id}
      className={`block p-3 rounded text-lg font-semibold  ${
        isActive ? "text-black bg-[#e7ebed]" : "text-lightText"
      }`}
    >
      {group.name}
    </Link>
  );
};

export default GroupItem;
