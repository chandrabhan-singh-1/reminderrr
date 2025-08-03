import { convexAdapter } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";
import { betterAuthComponent } from "../convex/auth";
import { type GenericCtx } from "../convex/_generated/server";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "@/lib/resend";

// You'll want to replace this with an environment variable
const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const createAuth = (ctx: GenericCtx) => {
  // Configure your Better Auth instance here
  return betterAuth({
    // All auth requests will be proxied through your next.js server
    baseURL: siteUrl,
    trustedOrigins: [siteUrl],
    database: convexAdapter(ctx, betterAuthComponent),
    user: {
      deleteUser: {
        enabled: true,
      },
    },
    // Simple non-verified email/password to get started
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      sendResetPassword: async ({ user, url, token }, request) => {
        await sendEmail({
          email: user.email,
          name: user.name ?? "User",
          type: "reset-password",
          url: url,
        });
      },
      onPasswordReset: async ({ user }, request) => {
        // your logic here
        console.log(`Password for user ${user.email} has been reset.`);
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url, token }, request) => {
        await sendEmail({
          email: user.email,
          name: user.name ?? "User",
          type: "user-verification",
          url: url,
        });
      },
    },
    plugins: [
      // The Convex plugin is required
      convex(),
      nextCookies(),
    ],
  });
};
