import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Next.js keeps secrets in .env.local, but dotenv reads only .env by default.
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Migrations need a direct connection. The Neon pooler can break them.
    url: process.env["DATABASE_URL_UNPOOLED"],
  },
});
