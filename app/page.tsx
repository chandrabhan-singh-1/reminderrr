import { preloadedQueryResult, preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getToken } from "@convex-dev/better-auth/nextjs";
import { createAuth } from "@/lib/auth";
import Link from "next/link";
import DeleteUserButton from "@/components/delete-user";

export default async function Home() {
  let data = null;

  try {
    const token = await getToken(createAuth);

    // Only try to preload if we have a token
    if (token) {
      const preloaded = await preloadQuery(
        api.auth.getCurrentUser,
        {},
        { token },
      );
      data = preloadedQueryResult(preloaded);

      if (data) {
        console.log("USER: ", data);
      }
    } else {
      console.log("No authentication token found - user not logged in");
    }
  } catch (error) {
    // Gracefully handle any authentication errors
    console.log("Authentication error:", error);
    data = null;
  }

  return (
    <main className="p-8 flex flex-col gap-4 mx-auto max-w-2xl">
      <h1 className="text-4xl font-bold text-center">Reminderrr</h1>
      <p className="text-center text-sm text-muted-foreground">
        Current User: {data?.email ?? "No user"}
      </p>
      <Link
        href="/sign-in"
        className="text-center text-blue-500 hover:underline"
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        className="text-center text-blue-500 hover:underline"
      >
        Sign Up
      </Link>
      <DeleteUserButton />
    </main>
  );
}
