import { UserModel } from "../models/user.model";

export const UserService = {
  async getAllUsers() {
    return await UserModel.findAll();
  },
  async registerUser(name: string, email: string) {
    if (!email.includes("@")) throw new Error("Email inválido");
    return await UserModel.create(name, email);
  }
};