import AuthDialog from "@/components/AuthDialog";

// A link to /sign-up inside the site opens the dialog over the current page.
export default function SignUpModal() {
  return <AuthDialog mode="sign-up" intercepted />;
}
