import Login from "./Login";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = (await getServerSession(authOptions)) as Session;

  if (session) return redirect("/");
  return <Login />;
};

export default page;