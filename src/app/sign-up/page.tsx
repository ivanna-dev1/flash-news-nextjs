import type { Metadata } from "next";
import Home from "../page";
import AuthDialog from "@/components/AuthDialog";

export const metadata: Metadata = {
  title: "Sign up",
  robots: { index: false },
};

// Direct visit: the home page news stay under the dialog as a background.
export default function SignUpPage() {
  return (
    <>
      <Home searchParams={Promise.resolve({})} />
      <AuthDialog mode="sign-up" intercepted={false} />
    </>
  );
}
