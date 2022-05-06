import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('SubmitFeedbackUseCase', () => {
  it('should be defined', () => {
    expect(SubmitFeedbackUseCase).toBeDefined();
  });
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'bug',
        comment: 'test',
        screenshot: 'data:image/png;base64,SUPERFOTODETESTE',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledTimes(1);
    expect(sendMailSpy).toHaveBeenCalledTimes(1);
  });
  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: '',
        comment: 'test',
        screenshot: 'data:image/png;base64,SUPERFOTODETESTE',
      })
    ).rejects.toThrow();
  });
  it('should not be able to submit feedback without comment', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'bug',
        comment: '',
        screenshot: 'data:image/png;base64,SUPERFOTODETESTE',
      })
    ).rejects.toThrow();
  });
  it('should not be able to submit feedback with an invalid screeenshot', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'bug',
        comment: 'test',
        screenshot: '12313123',
      })
    ).rejects.toThrow();
  });
});
