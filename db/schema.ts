import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const rooms = sqliteTable("rooms", { code: text("code").primaryKey(), secret: text("secret").notNull(), data: text("data").notNull(), version: integer("version").notNull().default(0), expires: integer("expires").notNull() });
