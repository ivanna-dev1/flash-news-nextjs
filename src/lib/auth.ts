import "server-only";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

// BETTER_AUTH_SECRET and BETTER_AUTH_URL are read from env by Better Auth.
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    // Same as the Better Auth default. Written here so the rule is easy to find.
    minPasswordLength: 8,
  },
});
