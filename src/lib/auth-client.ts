import { createAuthClient } from "better-auth/react";

// No baseURL: the client uses the current site origin + /api/auth.
export const authClient = createAuthClient();

export const { signUp, signIn, signOut, useSession } = authClient;
