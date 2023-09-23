import Image from "next/image";
import { getServerSession } from "@/utils/getServerSession";

import GroupItem from "./GroupItem";
import AddButton from "@/components/AddButton";
import NavIcon from "../Header/NavIcon";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { BiBell } from "react-icons/bi";
import Profile from "../Header/Profile";
import { group } from "../../_types/group.type";

interface IProps {
  groups: group[];
}

const GroupList: React.FC<IProps> = async ({ groups }) => {
  const session = await getServerSession();

  return (
    <>
      <div className="flex justify-between items-center">
        <Image
          src="/images/logo-primary.png"
          width={164}
          height={53.57}
          alt="jobzella-logo"
          className="my-5"
        />
        <NavIcon />
      </div>

      <div className="md:hidden flex items-center justify-between my-2">
        <div className="flex items-center">
          <HiMagnifyingGlass className="mr-6 text-2xl" />
          <BiBell className="mr-6 text-2xl" />
        </div>
        {session && session.user && (
          <Profile image={session?.user?.image} name={session?.user.name} />
        )}
      </div>

      <p className="text-[14px] font-semibold text-lightText mb-2">GROUPS</p>
      {!groups.length ? (
        <p className="text-center text-primary font-bold py-4">No groups</p>
      ) : (
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 280px)" }}
        >
          {groups.map((group: any) => (
            <GroupItem key={group._id} group={group} />
          ))}
        </div>
      )}
      <AddButton
        text="Add Group"
        queryKey="createGroupModal"
        className="mt-4 w-full"
      />
    </>
  );
};

export default GroupList;
