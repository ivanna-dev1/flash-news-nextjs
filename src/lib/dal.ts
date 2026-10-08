import "server-only";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

// The one place where the server checks who sent the request.
// Every bookmark endpoint calls this before it touches data.
export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}

// The same 401 answer for every endpoint that needs a signed-in user.
export const unauthorized = () => Response.json({ error: "Not signed in" }, { status: 401 });
