import { drizzle } from "drizzle-orm/node-postgres";
import { requiredEnv } from "@/env/required-env";
import * as schema from "./schema/auth";

export const db = drizzle({ connection: requiredEnv("DATABASE_URL"), schema });
