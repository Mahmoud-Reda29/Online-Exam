import AuthLayout from "../Components/auth/AuthLayout";

import { getServerSession } from "next-auth";
import { redirect as RedirectType } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

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
