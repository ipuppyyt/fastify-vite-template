import logger from "../shared/logger.js";
import config from "../shared/config.js";
import apiRoutes from "./api/index.js";
import Fastify from "fastify";
import serve from "./serve.js";

const server = Fastify();

serve(server);
server.register(apiRoutes, { prefix: "/api" });

server
  .listen({ port: config.server.port })
  .then(() => {
    logger.info(`Server is running at http://localhost:${config.server.port}`);
  })
  .catch((err) => {
    logger.error(`Error starting server: ${err.message}`);
    process.exit(1);
  });
