import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
        try {
          const { username, password } = credentials as Credentials;

          if (!username || !password) {
            throw new Error("Username and password are required");
          }

          const user = await prisma.user.findUnique({
            where: {
              username,
            },
          });

          if (!user) {
            throw new Error("User not found");
          }

          const isPasswordValid = password === user.password;

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return user;
        } catch (error) {
          throw new Error(`Authentication failed: ${error}`);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user && user.id) {
        token.uid = user.id as string;

        const userData = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });
      }

      return token;
    },
    session: async ({ session, token }) => {
      const userData = await prisma.user.findUnique({
        where: {
          id: token.uid as string,
        },
        select: {
          id: true,
          username: true,
        },
      });

      if (token?.uid && userData) {
        session.user = userData;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
