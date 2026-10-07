import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// The one place where the server checks who sent the request.
// Every bookmark endpoint and /saved call this before they touch data.
// cache: one database check per request, even if several parts call it.
export const getCurrentUser = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
});
