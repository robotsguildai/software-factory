import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth/server";
import { SignOutButton } from "./sign-out-button";

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  return (
    <main>
      <h1>Open Software Factory</h1>
      <p>Signed in as {session.user.email}</p>
      <SignOutButton />
    </main>
  );
}
