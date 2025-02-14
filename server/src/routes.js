import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { scoresTable } from "./db/schema.js";

const db = drizzle(process.env.DATABASE_URL);

export default async function routes(fastify, options) {
  fastify.get("/api/scores", async (request, reply) => {
    const allScores = await db.select().from(scoresTable);
    return allScores;
  });

  fastify.post("/api/scores", async (request, reply) => {
    const { player, score } = request.body;
    fastify.log.info(request);
    try {
      const result = await db
        .insert(scoresTable)
        .values({ player, score })
        .returning();
      return result[0];
    } catch (err) {
      fastify.log.error(err);
      reply.code(400).send({ error: "Score could not be created" });
    }
  });
}
