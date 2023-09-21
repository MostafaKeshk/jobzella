import Panels from "@/modules/home/components/Panels";
import Routes from "@/shared/routes";
import { getServerSession } from "@/shared/utils/getServerSession";
import { redirect } from "next/navigation";
import GroupList from "@/modules/home/components/GroupList";
import AddGroupDialog from "@/modules/home/components/GroupList/AddGroupDialog";
import Header from "@/modules/home/components/Header";

const Home = async ({ searchParams }: any) => {
  const showCreateGroupModal = searchParams?.createGroupModal;
  const groupId = searchParams?.group;

  const session = await getServerSession();
  if (!session?.token) {
    redirect(Routes.login);
  }

  return (
    <>
      <div className="flex h-screen">
        <GroupList selectedGroupId={groupId} />
        <div>
          <Header />
          <div className="overflow-x-scroll mt-5">
            <Panels />
          </div>
        </div>
      </div>
      {showCreateGroupModal && <AddGroupDialog selectedGroupId={groupId} />}
    </>
  );
};

export default Home;
