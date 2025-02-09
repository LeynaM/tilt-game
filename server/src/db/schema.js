import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const scoresTable = sqliteTable("scores_table", {
    id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
    player: text().notNull(),
    score: text().notNull(),
    timestamp: text().default(sql`(CURRENT_TIMESTAMP)`),
});
