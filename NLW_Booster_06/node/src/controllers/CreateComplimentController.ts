import { Request, Response } from "express";
import { ComplimentService } from "../services/ComplimentService";

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_sender, user_receiver, message } = request.body;

    const complimentService = new ComplimentService();

    const compliment = await complimentService.execute({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    return response.json(compliment);
  }
}

export { CreateComplimentController };
