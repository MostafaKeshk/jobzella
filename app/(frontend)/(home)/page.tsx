import Panels from "./_components/Panels";
import Routes from "@/routes";
import { getServerSession } from "@/utils/getServerSession";
import { redirect } from "next/navigation";
import GroupList from "./_components/GroupList";
import AddGroupDialog from "./_components/GroupList/AddGroupDialog";
import Header from "./_components/Header";

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
