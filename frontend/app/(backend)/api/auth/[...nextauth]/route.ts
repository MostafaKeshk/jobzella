import LoginApi from "@/app/(frontend)/login/_apis/login";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
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
    async jwt({ token, user }: { token: JWT; user?: any }): Promise<JWT> {
      if (user) {
        token._id = user.user._id;
        token.token = user.token;
        token.name = user.user.name;
        token.email = user.user.email;
        token.image = user.user.image;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      const body = {
        ...session,
        token: token.token,
        user: {
          ...session.user,
          _id: token._id,
          image: token.image,
        },
      };

      return body;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
