// @ts-ignore
import { SendMailClient } from "zeptomail";

const url = "api.zeptomail.in/";
const token = process.env.ZEPTOMAIL_TOKEN;

const client = new SendMailClient({ url, token });

interface SendMailProps {
  email: string;
  name: string;
  subject: string;
  body: string;
}

export const sendMail = async ({
  email,
  name,
  subject,
  body,
}: SendMailProps) => {
  if (!token) {
    throw new Error("ZEPTOMAIL_TOKEN is not configured");
  }

  return client
    .sendMail({
      from: {
        address: process.env.ZEPTOMAIL_FROM_EMAIL || "mail@aravallitrends.com",
        name: "Reminderrr",
      },
      to: [
        {
          email_address: {
            address: email,
            name: name,
          },
        },
      ],
      subject: subject,
      htmlbody: body,
    })
    .then((resp: any) => {
      console.log("ZeptoMail email sent:", resp);
    })
    .catch((error: unknown) => {
      throw error;
    });
};
