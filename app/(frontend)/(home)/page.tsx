import Panels from "./_components/Panels";
import Routes from "@/routes";
import { getServerSession } from "@/utils/getServerSession";
import { redirect } from "next/navigation";
import GroupList from "./_components/GroupList";
import AddGroupDialog from "./_components/GroupList/AddGroupDialog";
import Header from "./_components/Header";
import TaskDialog from "./_components/Task/TaskModal";
import TaskApi from "./_apis/task";
import { filterItemByStatus } from "./_utils/filterItemsByStatus";
import StoreInitializer from "@/store/StoreInitializer";
import TwoScreensLayout from "@/components/layouts/TwoScreensLayout";

const Home = async ({ searchParams }: any) => {
  const showCreateGroupModal = searchParams?.createGroupModal;
  const showCreateTaskModal = searchParams?.createTaskModal;

  const groupId = searchParams?.group;

  const session = await getServerSession();
  if (!session?.token) {
    redirect(Routes.login);
  }

  const items =
    !!session && groupId && (await TaskApi.get(groupId, session.token));

  return (
    <>
      <StoreInitializer openNav={false} />

      <TwoScreensLayout
        Left={<GroupList selectedGroupId={groupId} />}
        Right={
          <>
            <Header />
            <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
              {groupId ? (
                <Panels
                  selectedGroupId={groupId}
                  initItems={filterItemByStatus(items)}
                />
              ) : (
                <p>select group</p>
              )}
            </div>
          </>
        }
      />

      {showCreateGroupModal && <AddGroupDialog selectedGroupId={groupId} />}
      {showCreateTaskModal && <TaskDialog selectedGroupId={groupId} />}
    </>
  );
};

export default Home;
