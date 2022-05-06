import { Request, Response, Router } from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = Router();

routes.post('/feedbacks', async (request: Request, response: Response) => {
  const { type, comment, screenshot } = request.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const modemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    modemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({ type, comment, screenshot });

  return response.status(201).end();
});
