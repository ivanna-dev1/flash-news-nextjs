import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

// Catch-all: every /api/auth/* request goes to Better Auth.
export const { GET, POST } = toNextJsHandler(auth);
