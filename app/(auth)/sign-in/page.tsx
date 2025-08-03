import { api } from "@/convex/_generated/api";
import { createAuth } from "@/lib/auth";
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { getToken } from "@convex-dev/better-auth/nextjs";
import { preloadedQueryResult, preloadQuery } from "convex/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
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

  return <SignInView />;
};

export default Page;
