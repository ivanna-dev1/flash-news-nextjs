import AuthDialog from "@/components/AuthDialog";

// A link to /sign-in inside the site opens the dialog over the current page.
export default function SignInModal() {
  return <AuthDialog mode="sign-in" intercepted />;
}
