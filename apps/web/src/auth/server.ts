import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db/client";
import { requiredEnv } from "@/env/required-env";

export const auth = betterAuth({
  baseURL: requiredEnv("APP_URL"),
  database: drizzleAdapter(db, { provider: "pg" }),
  socialProviders: {
    github: {
      clientId: requiredEnv("GITHUB_CLIENT_ID"),
      clientSecret: requiredEnv("GITHUB_CLIENT_SECRET"),
    },
  },
  plugins: [nextCookies()],
});
