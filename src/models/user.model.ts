import postgres from "postgres";

// Configuración de conexión (usando variables de entorno)

const sql = postgres(process.env.DATABASE_URL!);
console.log("Intentando conectar con:", process.env.DATABASE_URL);

export const UserModel = {
  async findAll() {
    return await sql`SELECT id, name, email FROM users`;
  },
  async create(name: string, email: string) {
    return await sql`INSERT INTO users (name, email) VALUES (${name}, ${email}) RETURNING *`;
  }
};