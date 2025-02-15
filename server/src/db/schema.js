import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const scoresTable = sqliteTable("scores_table", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  rank: integer().notNull(),
  player: text().notNull(),
  score: integer().notNull(),
  createdAt: integer().default(sql`(strftime('%s', 'now'))`),
});
