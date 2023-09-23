import Link from "next/link";

interface IProps {
  group: {
    _id: string;
    name: string;
  };
  isActive: boolean;
}

const GroupItem: React.FC<IProps> = ({ group, isActive }) => {
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
