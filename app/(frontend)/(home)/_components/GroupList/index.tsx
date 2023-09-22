import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "@/utils/getServerSession";
import GroupApi from "../../_apis/group";
import GroupItem from "./GroupItem";
import { IoMdAddCircleOutline } from "react-icons/io";

const GroupList = async ({ selectedGroupId }: any) => {
  const session = await getServerSession();
  const groups = !!session ? await GroupApi.get(session.token) : [];

  const modalPath = !!selectedGroupId
    ? `/?group=${selectedGroupId}&createGroupModal=true`
    : "/?createGroupModal=true";

  return (
    <div className="bg-background min-w-[250px] px-5">
      <Image
        src="/images/logo-primary.png"
        width={164}
        height={53.57}
        alt="jobzella-logo"
        className="my-5"
      />
      <p className="text-[14px] font-semibold text-lightText mb-2">GROUPS</p>
      {groups?.map((group: any) => (
        <GroupItem
          key={group._id}
          group={group}
          isActive={selectedGroupId === group._id}
        />
      ))}
      <Link
        className="flex justify-center items-center mt-4 w-full bg-primary rounded-xl py-3 text-white  disabled:bg-lightPrimary hover:bg-primaryBold transition"
        href={modalPath}
      >
        <IoMdAddCircleOutline className="mr-1 text-xl" />
        Add Group
      </Link>
    </div>
  );
};

export default GroupList;
