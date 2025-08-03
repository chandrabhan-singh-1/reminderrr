import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { sendMail } from "../lib/zeptomail";

export const sendEmail = internalMutation({
  args: {
    email: v.string(),
    name: v.string(),
    subject: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    await sendMail({
      email: args.email,
      name: args.name,
      subject: args.subject,
      body: args.body,
    });
  },
});
