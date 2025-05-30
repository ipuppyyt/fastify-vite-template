import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyStatic from "@fastify/static";
import logger from "../shared/logger.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";


const HTML_TEMPLATES = {
  NOT_FOUND: `<html>
  <head><title>404 Not Found</title></head>
  <body>
    <h1>Not Found</h1>
    <p>The requested resource was not found.</p>
  </body>
</html>`,
};


export default (server: FastifyInstance): void => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const clientBuildPath = path.join(__dirname, "../client");

  setupErrorHandlers(server);

  if (fs.existsSync(clientBuildPath)) {
    setupClientRoutes(server, clientBuildPath);
  } else {
    setupFallbackRoutes(server);
  }
};


function setupClientRoutes(server: FastifyInstance, clientBuildPath: string): void {
  server.register(fastifyStatic, {
    root: clientBuildPath,
    prefix: "/",
    index: "index.html",
  });


  server.setNotFoundHandler((request, reply) => {
    if (!request.url.startsWith("/api/*")) {
      reply.sendFile("index.html");
    } else {
      sendNotFound(reply);
    }
  });
}

function setupFallbackRoutes(server: FastifyInstance): void {
  server.get("*", (_request: FastifyRequest, reply: FastifyReply) => {
    sendNotFound(reply);
  });
}

function setupErrorHandlers(server: FastifyInstance): void {
  server.setErrorHandler((error, _request, reply) => {
    logger.error(error.message);

    reply.code(500).type("application/json").send({
      error: "Internal Server Error",
      message: "An unexpected error occurred on the server",
    });
  });
}

function sendNotFound(reply: FastifyReply): void {
  reply.code(404).type("text/html").send(HTML_TEMPLATES.NOT_FOUND);
}
