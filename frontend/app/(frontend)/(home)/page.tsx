import Panels from "./_components/Panels";
import Routes from "@/routes";
import { getServerSession } from "@/utils/getServerSession";
import { redirect } from "next/navigation";
import GroupList from "./_components/GroupList";
import AddGroupDialog from "./_components/GroupList/GroupDialog";
import Header from "./_components/Header";
import TaskDialog from "./_components/Task/TaskModal";
import TaskApi from "./_apis/task";
import { filterTasksByStatus } from "./_utils/filterTasksByStatus";
import StoreInitializer from "@/store/StoreInitializer";
import TwoScreensLayout from "@/components/layouts/TwoScreensLayout";
import CreateSvg from "./_svgs/Create";

const Home = async ({ searchParams }: any) => {
  const showCreateGroupModal = searchParams?.createGroupModal;
  const showCreateTaskModal = searchParams?.createTaskModal;

  const groupId = searchParams?.group;

  const session = await getServerSession();
  if (!session) {
    redirect(Routes.login);
  }

  const tasks =
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
                <Panels initTasks={filterTasksByStatus(tasks)} />
              ) : (
                <div className="flex h-[90vh] flex-col items-center justify-center">
                  <CreateSvg />
                  <h2 className="md:text-2xl text-lg text-center  text-primary mt-6">
                    please select a group from the sidebar or create a new one.
                  </h2>
                </div>
              )}
            </div>
          </>
        }
      />

      {showCreateGroupModal && <AddGroupDialog />}
      {showCreateTaskModal && <TaskDialog />}
    </>
  );
};

export default Home;
