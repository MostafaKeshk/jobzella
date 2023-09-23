import GroupList from "./_components/GroupList";
import Header from "./_components/Header";
import StoreInitializer from "@/store/StoreInitializer";
import TwoScreensLayout from "@/components/layouts/TwoScreensLayout";
import GroupApi from "./_apis/group";
import { getServerSession } from "@/utils/getServerSession";
import { Suspense } from "react";
import Loading from "./loading";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  const groups = !!session ? await GroupApi.get(session.token) : [];

  return (
    <>
      <StoreInitializer openNav={false} />
      <TwoScreensLayout
        Left={
          <Suspense fallback={<Loading />}>
            <GroupList groups={groups} />
          </Suspense>
        }
        Right={
          <>
            <Header />
            {children}
          </>
        }
      />
    </>
  );
};

export default Layout;
