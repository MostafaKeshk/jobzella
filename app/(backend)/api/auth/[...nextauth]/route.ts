import { url } from "@/config/url";
import LoginApi from "@/modules/login/apis/login";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "mostafa@admin.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${url}/api/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (res.ok && data) {
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
