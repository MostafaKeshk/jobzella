import { authOptions } from "@/app/(backend)/api/auth/[...nextauth]/route";
import { ISession } from "@/app/(frontend)/login/_types/session.type";
import { getServerSession as getSession } from "next-auth";

export const getServerSession = async () => {
  const session: ISession = await getSession(authOptions);
  return session;
};
