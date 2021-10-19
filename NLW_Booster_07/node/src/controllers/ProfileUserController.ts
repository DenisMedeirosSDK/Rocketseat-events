import { Request, Response } from 'express';
import { ProfileUserService } from '../services/ProfileUserService';

class ProfileUserController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const service = new ProfileUserService();

    try {
      const result = await service.execute(userId);

      return response.json(result);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { ProfileUserController };
