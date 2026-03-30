import { UserController } from "./src/controllers/user.controller";

const server = Bun.serve({
  port: 3001,
  hostname: "0.0.0.0",
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/users") {
      if (req.method === "GET") return UserController.getUsers();
      if (req.method === "POST") return UserController.createUser(req);
    }

    return new Response("Ruta no encontrada", { status: 404 });
  },
});

console.log(`🚀 Servidor Bun en http://localhost:${server.port}`);