import { url } from "@/config/url";
import LoginApi from "@/modules/login/apis/login";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        const { ok, data } = await LoginApi.login(credentials);

        if (ok && data) {
          return data;
        }
        throw new Error(data.message);
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      console.log("user", user);
      if (user) {
        token.id = user.user._id;
        token.token = user.token;
        token.name = user.user.name;
        token.email = user.user.email;
        token.image = user.user.image;
      }

      return token;
    },
    async session({ session, token }: any) {
      const body = {
        ...session,
        token: token.token,
        user: {
          ...session.user,
          id: token.id,
        },
      };

      return body;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
