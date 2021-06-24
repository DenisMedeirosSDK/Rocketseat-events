import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
}

class ComplimentService {
  async execute({
    message,
    tag_id,
    user_receiver,
    user_sender,
  }: IComplimentRequest) {
    const complimentRepository = getCustomRepository(ComplimentsRepositories);
    const usersRepository = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) {
      throw new Error("Incorrect user receiver");
    }

    const usersReceiverExists = await usersRepository.findOne(user_receiver);

    if (!usersReceiverExists) {
      throw new Error("User Receiver does not exists");
    }

    const compliment = complimentRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    await complimentRepository.save(compliment);

    return compliment;
  }
}

export { ComplimentService };
