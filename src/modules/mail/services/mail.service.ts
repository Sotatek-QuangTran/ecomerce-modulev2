import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';
import { ISendMailWithCode, ISendMailWithUrl } from '../mail.interface';
import { renderFile } from 'ejs';
import * as path from 'path';

@Injectable()
export class MailService {
  private transporter: Transporter;
  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: configService.get('EMAIL_SENDER'),
        pass: configService.get('EMAIL_PASS'),
      },
    });
  }

  async sendMailRegister(data: ISendMailWithUrl) {
    const tempPath = path.join(__dirname, '..', '/templates/welcome.ejs');
    const template = await renderFile(tempPath, {
      name: data.email,
      confirmation_url: data.url,
      contact_us: '',
      term: '',
      privacy: '',
    });
    this.transporter.sendMail({
      from: `"Sotatek" <${this.configService.get('EMAIL_SENDER')}>`,
      to: data.email,
      subject: 'Verify your email address',
      text: 'Thank you for register',
      html: template,
    });
    return;
  }

  async sendMailForgotPassword(data: ISendMailWithCode) {
    const tempPath = path.join(__dirname, '..', '/templates/resetpass.ejs');
    const template = await renderFile(tempPath, {
      name: data.email,
      code: data.code,
      contact_us: '',
      term: '',
      privacy: '',
    });
    this.transporter.sendMail({
      from: `"Sotatek" <${this.configService.get('EMAIL_SENDER')}>`,
      to: data.email,
      subject: 'Your security code',
      text: 'Send mail forgot password',
      html: template,
    });
  }
}
