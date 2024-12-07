import AuthLayout from "../Components/auth/AuthLayout";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect as RedirectType } from "next/navigation";

export default async function AuthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    RedirectType("/home");
  }
  return <AuthLayout>{children}</AuthLayout>;
}
