import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@prisma/client';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendRecoveryNewPassword(user: User) {
    try
    {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Your new password has been set',
        template: './recoverypassword',
        context: {
          name: user.firstName,
          password: user.password,
        },
      });

    }
    catch (error)
    {
      throw new BadRequestException(error);
    }
  }
}