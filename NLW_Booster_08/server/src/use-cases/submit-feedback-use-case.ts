import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface Request {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private readonly feedbackRepository: FeedbacksRepository,
    private readonly mailAdapter: MailAdapter
  ) {}

  async execute({ comment, type, screenshot }: Request): Promise<void> {
    if (!type) {
      throw new Error('Type is required');
    }

    if (!comment) {
      throw new Error('Comment is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new Error('Invalid screenshot');
    }

    await this.feedbackRepository.create({ comment, type, screenshot });
    await this.mailAdapter.sendMail({
      subject: `Novo feedback de ${type}`,
      body: [
        `<div styles="font-family: sans-serif; font-size:16px; color: #111;">`,
        `<p>Novo feedback de ${type}</p>`,
        `<p>${comment}</p>`,
        screenshot ? `<img src="${screenshot}" alt="${type}" />` : ``,
        `</div>`,
      ].join(''),
    });
  }
}
