import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { scoresTable } from "./db/schema.js";
import { lt, gt, sql, asc, desc, or, and, eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL);

export default async function routes(fastify, options) {
  fastify.get("/api/scores", async (request, reply) => {
    const allScores = await db
      .select()
      .from(scoresTable)
      .orderBy(asc(scoresTable.rank), asc(scoresTable.createdAt));
    return allScores;
  });

  fastify.post("/api/scores", async (request, reply) => {
    const { player, score, time } = request.body;

    fastify.log.info(request);
    try {
      const newRank = await db
        .$count(
          scoresTable,
          or(
            gt(scoresTable.score, score),
            and(eq(scoresTable.score, score), lt(scoresTable.time, time)),
          ),
        )
        .then((count) => {
          return count + 1;
        });
      fastify.log.info(newRank);

      const updatedScores = await db
        .update(scoresTable)
        .set({ rank: sql`rank + 1` })
        .where(
          or(
            lt(scoresTable.score, score),
            and(eq(scoresTable.score, score), gt(scoresTable.time, time)),
          ),
        )
        .returning();

      const result = await db
        .insert(scoresTable)
        .values({ player, score, time, rank: newRank })
        .returning();

      return {
        score: result[0],
        updatedScores,
      };
    } catch (err) {
      fastify.log.error(err);
      reply.code(400).send({ error: "Score could not be created" });
    }
  });
}
