export interface ISendMail {
  email: string;
}

export interface ISendMailWithCode extends ISendMail {
  code: string;
}

export interface ISendMailWithUrl extends ISendMail {
  url: string;
}
