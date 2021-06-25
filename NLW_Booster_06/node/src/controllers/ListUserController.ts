import { Request, Response } from "express";
import { ListUserService } from "../services/ListUserService";

class ListUserController {
  async handle(request: Request, response: Response) {
    const usersRepository = new ListUserService();

    const users = await usersRepository.execute();

    return response.json(users);
  }
}

export { ListUserController };
