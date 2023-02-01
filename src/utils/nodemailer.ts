import nodemailer, { SendMailOptions } from "nodemailer";
import config from "config";

export async function createTestAccount() {
  const testCred = await nodemailer.createTestAccount();
}

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>("smtp");

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
});

export async function sendMail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      console.log(err, "error sending email");
    }
    console.log(`preview url: ${nodemailer.getTestMessageUrl(info)}`);
  });
}
