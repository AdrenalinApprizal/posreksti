import Dashboard from "./Dashboard";
import { prisma } from "./lib/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

const page = async () => {
  const session = (await getServerSession(authOptions)) as Session;

  if (!session) return redirect("/login");

  const user = await prisma.user.findUnique({
    where: {
      username: session.user.username,
    },
  });

  return <Dashboard />;
};

export default page;
