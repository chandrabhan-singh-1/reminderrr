import { pretty, render } from "@react-email/components";
import { Resend } from "resend";

import ResetPasswordEmail from "@/components/email/ResetPasswordEmail";
import UserVerificationEmail from "@/components/email/UserVerificationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendMailProps {
  email: string;
  name: string;
  type: "reset-password" | "user-verification";
  url: string;
}

export const sendEmail = async ({ email, name, type, url }: SendMailProps) => {
  let subject = "";
  let body = "";

  if (type === "reset-password") {
    subject = "Reset your password";
    body = await pretty(
      await render(ResetPasswordEmail({ name, url }), {
        plainText: true,
      }),
    );
  } else if (type === "user-verification") {
    subject = "Verify your email";
    body = await pretty(
      await render(UserVerificationEmail({ name, url }), {
        plainText: true,
      }),
    );
  }

  await resend.emails.send({
    from: "Reminderrr <mail@aravallitrends.com>",
    to: [email],
    subject: subject,
    html: body,
  });
};
