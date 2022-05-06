import { prisma } from '../../prisma';
import {
  FeedbackCreateData,
  FeedbacksRepository,
} from '../feedbacks-repository';

export class PrismaFeedbackRepository implements FeedbacksRepository {
  async create(data: FeedbackCreateData): Promise<void> {
    await prisma.feedback.create({
      data: {
        type: data.type,
        comment: data.comment,
        screenshot: data.screenshot,
      },
    });
  }
}
