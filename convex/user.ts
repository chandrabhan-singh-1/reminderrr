import { ConvexError, v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// You can read data from the database via a query:
export const getUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.db.query("users").first();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

export const createUser = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.insert("users", {
      name: args.name,
    });

    if (!user) {
      throw new ConvexError("Failed to create user");
    }

    return user;
  },
});
