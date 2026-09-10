import { Pool } from "pg";

const pool = new Pool({
  user: process.env.POSTGRES_USER || "admin",
  password: process.env.POSTGRES_PASSWORD || "admin",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.POSTGRES_DB || "aura-db",
});

export default pool;
