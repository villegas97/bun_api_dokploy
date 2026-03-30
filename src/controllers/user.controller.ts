import { UserService } from "../services/user.service";

// Definimos la estructura que esperamos del cliente
interface UserRequestBody {
  name: string;
  email: string;
}

export const UserController = {
  // GET /users
  async getUsers() {
    try {
      const users = await UserService.getAllUsers();
      return Response.json(users);
    } catch (error) {
      return Response.json({ error: "Error al obtener usuarios" }, { status: 500 });
    }
  },

  // POST /users
  async createUser(req: Request) {
    try {
      // Validamos que el cuerpo sea JSON
      const body = await req.json() as UserRequestBody;
      console.log("Datos recibidos para crear usuario:", body);
      // Verificación básica de presencia de datos
      if (!body.name || !body.email) {
        return Response.json({ error: "Nombre y email son requeridos" }, { status: 400 });
      }

      const newUser = await UserService.registerUser(body.name, body.email);
      return Response.json(newUser, { status: 201 });
      
    } catch (error) {
      // Manejo de error si el JSON está mal formado o hay error en el servicio
      return Response.json({ error: "Datos inválidos o error en el servidor" }, { status: 400 });
    }
  }
};