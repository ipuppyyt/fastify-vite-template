import { FastifyInstance } from "fastify";

export async function healthRoutes(server: FastifyInstance) {
  server.get("/", async () => {
    return { name: "Health Check", status: "ok" };
  });

  server.post("/", async () => {
    return { name: "Health Check", status: "ok" };
  });

  server.patch("/", async () => {
    return { name: "Health Check", status: "ok" };
  });

  server.put("/", async () => {
    return { name: "Health Check", status: "ok" };
  });

  server.delete("/", async () => {
    return { name: "Health Check", status: "ok" };
  });
}
