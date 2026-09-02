"use client";

import { authClient } from "@/auth/client";

export function SignInWithGitHubButton() {
  return (
    <button type="button" onClick={() => authClient.signIn.social({ provider: "github", callbackURL: "/" })}>
      Continue with GitHub
    </button>
  );
}
