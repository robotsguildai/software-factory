"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/auth/client";

export function SignOutButton() {
  const router = useRouter();
  return (
    <button type="button" onClick={() => authClient.signOut().then(() => router.push("/sign-in"))}>
      Sign out
    </button>
  );
}
