import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import pg from "pg";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}

export const auth = betterAuth({
  baseURL: requiredEnv("APP_URL"),
  database: new pg.Pool({ connectionString: requiredEnv("DATABASE_URL") }),
  socialProviders: {
    github: {
      clientId: requiredEnv("GITHUB_CLIENT_ID"),
      clientSecret: requiredEnv("GITHUB_CLIENT_SECRET"),
    },
  },
  plugins: [nextCookies()],
});
