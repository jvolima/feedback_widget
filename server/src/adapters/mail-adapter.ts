export interface SendMailData {
  subject: string;
  body: string;
}

export interface MailAdapter {
  sendMail: ({ subject, body }: SendMailData) => Promise<void>;
}