import Routes from "@/shared/routes";
import { getServerSession } from "@/shared/utils/getServerSession";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getServerSession();
  if (!session?.token) {
    redirect(Routes.login);
  }
  console.log(session);
  return <>{session?.token}</>;
};

export default Home;
