import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.db2.prisma",
  migrations: {
    path: "prisma/migrations-db2",
  },
  datasource: {
    url: process.env["DATABASE_URL_DB2"],
  },
});
