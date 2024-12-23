import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'localhost',
          port: 1025,
          secure: false,
          tls: {
            rejectUnauthorized: false,
          },
        },
        defaults: {
          from: '"Sangimed" <sangimed@dumbmail.me>',
        },
        template: {
          dir: __dirname + '/../../templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
