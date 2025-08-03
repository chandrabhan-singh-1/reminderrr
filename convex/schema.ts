import { defineSchema } from "convex/server";
import { v } from "convex/values";
import { Table } from "convex-helpers/server";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.

export const Users = Table("users", {
  name: v.string(),
});

export default defineSchema({
  users: Users.table,
});
