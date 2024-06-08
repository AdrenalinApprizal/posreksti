import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "../../../lib/prismadb";

interface Credentials {
  username: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        const { username, password } = credentials as Credentials;

        if (!username || !password) {
          throw new Error("Username and password are required");
        }

        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        id: token.uid as string,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
