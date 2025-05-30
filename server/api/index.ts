import { healthRoutes } from "./health/index.js";
import { FastifyInstance } from "fastify";

export default async function apiRoutes(server: FastifyInstance) {
  server.register(healthRoutes, { prefix: "/health" });
}