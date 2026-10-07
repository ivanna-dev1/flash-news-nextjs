import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// The one place where the server checks who sent the request.
// Every bookmark endpoint calls this before it touches data. (/saved does not:
// its list is client-side and goes through /api/bookmarks.)
// cache: one database check per page render, even if several components call it.
// It has no effect in Route Handlers (each call there is a new check).
export const getCurrentUser = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
});

// The same 401 answer for every endpoint that needs a signed-in user.
export const unauthorized = () => Response.json({ error: "Not signed in" }, { status: 401 });
