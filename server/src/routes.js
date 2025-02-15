import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { scoresTable } from "./db/schema.js";
import { lt, gt, sql } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL);

export default async function routes(fastify, options) {
  fastify.get("/api/scores", async (request, reply) => {
    const allScores = await db
      .select()
      .from(scoresTable)
      .orderBy(scoresTable.createdAt, scoresTable.rank);
    return allScores;
  });

  fastify.post("/api/scores", async (request, reply) => {
    const { player, score } = request.body;

    fastify.log.info(request);
    try {
      const newRank = await db
        .$count(scoresTable, gt(scoresTable.score, score))
        .then((count) => {
          return count + 1;
        });
      fastify.log.info(newRank);

      const updatedScores = await db
        .update(scoresTable)
        .set({ rank: sql`rank + 1` })
        .where(lt(scoresTable.score, score))
        .returning();

      const result = await db
        .insert(scoresTable)
        .values({ player, score, rank: newRank })
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
