import Image from "next/image";
import { item } from "../../_types/item.type";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { TbClockHour4 } from "react-icons/tb";
import { PiFolderMinus } from "react-icons/pi";
import ProgressBar from "@/components/ProgressBar";

type IProps = {
  item: item;
  panelColor: string;
  barColor: string;
};

const Item: React.FC<IProps> = ({ item, panelColor, barColor }) => {
  return (
    <div className="bg-[#f9f9f9] rounded-lg shadow-lg my-2">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <BiDotsHorizontalRounded className="text-2xl" />
        </div>
        <p className="text-gray-600">{item.description}</p>
        <div className="bg-[#D9EEF3] p-1 inline-flex items-center rounded my-3">
          <TbClockHour4 className="text-[#5AC3DD] mr-1" />
          <span className="text-[#5AC3DD] text-[12px] font-semibold">
            {item.deadline}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center mb-3">
            {item.assignedUsers.map((user: any, index: number) => (
              <Image
                key={user._id}
                src={user.image}
                width={30}
                height={30}
                alt={user.name}
                className={`border-2 border-white rounded-full ${
                  index > 0 && "-ml-2"
                }`}
                style={{ zIndex: `${item.assignedUsers.length - index}` }}
              />
            ))}
          </div>
          <div className="flex items-center ">
            <PiFolderMinus className="text-[#787486] text-lg mr-1" />
            <span className="text-[#787486] text-[12px] font-semibold">
              {item.files} files
            </span>
          </div>
        </div>
        <ProgressBar
          filledColor={panelColor}
          barColor={barColor}
          width={`${item.progress}%`}
          height="h-2"
        />
      </div>
    </div>
  );
};

export default Item;
