import Image from "next/image";
import { getServerSession } from "@/utils/getServerSession";
import GroupApi from "../../_apis/group";
import GroupItem from "./GroupItem";
import AddButton from "@/components/AddButton";
import NavIcon from "../Header/NavIcon";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { BiBell } from "react-icons/bi";
import Profile from "../Header/Profile";
const GroupList = async ({ selectedGroupId }: any) => {
  const session = await getServerSession();
  const groups = !!session ? await GroupApi.get(session.token) : [];

  const modalPath = !!selectedGroupId
    ? `/?group=${selectedGroupId}&createGroupModal=true`
    : "/?createGroupModal=true";

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
        <Profile image={session?.user?.image} name={session?.user.name} />
      </div>

      <p className="text-[14px] font-semibold text-lightText mb-2">GROUPS</p>
      {!groups.length ? (
        <p>no groups</p>
      ) : (
        groups.map((group: any) => (
          <GroupItem
            key={group._id}
            group={group}
            isActive={selectedGroupId === group._id}
          />
        ))
      )}
      <AddButton
        text="Add Group"
        modalPath={modalPath}
        className="mt-4 w-full"
      />
    </>
  );
};

export default GroupList;
