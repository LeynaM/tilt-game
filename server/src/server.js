import cors from "@fastify/cors";
import Fastify from "fastify";
import routes from "./routes.js";

const fastify = Fastify({ logger: true });

fastify.register(cors);
fastify.register(routes);

const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        console.log("Server running at http://localhost:3000");
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
