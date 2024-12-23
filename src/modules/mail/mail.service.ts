import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(params: {
    subject: string;
    template: string;
    context: ISendMailOptions['context'];
  }) {
    try {
      const emailsList: string[] = process.env.SMTP_TO?.split(',');

      if (!emailsList) {
        throw new Error(
          `No recipients found in SMTP_TO env var, please check your .env file`,
        );
      }

      const sendMailParams = {
        to: emailsList,
        from: process.env.SMTP_FROM || 'no-reply@nestjs.com',
        subject: params.subject,
        template: params.template,
        context: params.context,
      };
      const response = await this.mailerService.sendMail(sendMailParams);
      this.logger.log(
        `Envoi du mail OK avec les paramètres suivants : ${JSON.stringify(
          sendMailParams,
        )}`,
        response,
      );
    } catch (error) {
      this.logger.error(
        `Erreur lors de l'envoi du mail avec les paramètres suivants : ${JSON.stringify(
          params,
        )}`,
        error,
      );
    }
  }
}
