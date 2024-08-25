import { Database } from "./types";
import { Pool } from "pg";
import { PostgresDialect } from "kysely";
import dotenv from 'dotenv';
import { KyselyAuth } from "@auth/kysely-adapter";

dotenv.config({ path: '.env.local' });

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    max: 10,
  })
});

export { dialect };
export const db = new KyselyAuth<Database>({
  dialect,
});
