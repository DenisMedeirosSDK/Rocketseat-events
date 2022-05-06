import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: String(process.env.MAIL_HOST),
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: String(process.env.MAIL_USER),
    pass: String(process.env.MAIL_PASS),
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData): Promise<void> {
    await transport.sendMail({
      from: 'Equipe feedback <oi@email.com>',
      to: 'Denis Medeiros <contato.denismedeiros@hotmail.com>',
      subject,
      html: body,
    });
  }
}
