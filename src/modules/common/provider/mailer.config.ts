import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const mailerConfig = MailerModule.forRoot({
  transport: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'casamanioca.developer@gmail.com',
      pass: 'lqgh kfyy vnsi rixw',
    },
    tls: {
      rejectUnauthorized: true,
    },
  },
  defaults: {
    from: '"No Reply" <casamanioca.developer@gmail.com>',
  },
  template: {
    dir: join(__dirname, 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
});