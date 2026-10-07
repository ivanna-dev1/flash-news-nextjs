"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import { CloseIcon } from "./HeaderIcons";

type Mode = "sign-in" | "sign-up";

interface AuthDialogProps {
  mode: Mode;
  // true: opened over the current page (intercepted route), so "back" closes it.
  // false: /sign-in was opened directly, so there may be no page to go back to.
  intercepted: boolean;
}

const MIN_PASSWORD = 8;

// Better Auth error codes -> our English messages.
const ERROR_MESSAGES: Record<string, string> = {
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "Email already in use",
  INVALID_EMAIL_OR_PASSWORD: "Wrong email or password",
  PASSWORD_TOO_SHORT: `Password must be at least ${MIN_PASSWORD} characters`,
  INVALID_EMAIL: "Enter a valid email",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INPUT =
  "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500";

export default function AuthDialog({ mode, intercepted }: AuthDialogProps) {
  const router = useRouter();
  const isSignUp = mode === "sign-up";
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  // A ref, because the Escape listener is added once and would see an old state.
  const pendingRef = useRef(false);

  const close = () => (intercepted ? router.back() : router.replace("/"));
  // Backdrop, Escape and the cross do nothing while a request runs. Otherwise the
  // dialog closes ("back"), and the successful answer then goes "back" a second time.
  const dismiss = () => {
    if (!pendingRef.current) close();
  };
  const setPending = (value: boolean) => {
    pendingRef.current = value;
    setIsPending(value);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    // Lock page scroll under the dialog. scrollbar-gutter keeps the width stable.
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // dismiss() only depends on router, intercepted and a ref, which do not change here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    // Our own checks: browser messages would use the system language.
    if (isSignUp && !name) return setError("Enter your name");
    if (!EMAIL_PATTERN.test(email)) return setError("Enter a valid email");
    if (isSignUp && password.length < MIN_PASSWORD)
      return setError(ERROR_MESSAGES.PASSWORD_TOO_SHORT);
    if (!password) return setError("Enter your password");

    setError("");
    setPending(true);
    try {
      const result = isSignUp
        ? await signUp.email({ name, email, password })
        : await signIn.email({ email, password });
      if (result.error) {
        const code = result.error.code ?? "";
        setError(ERROR_MESSAGES[code] ?? "Something went wrong. Please try again.");
        return;
      }
      close();
    } catch {
      // No network: the request throws instead of returning an error.
      setError("No connection. Please try again.");
    } finally {
      // Without finally the button stays "Please wait…" after a thrown error.
      setPending(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-100/80 backdrop-blur-[2px]"
      // Close only when the press starts on the backdrop. With onClick, a text selection
      // that starts in a field and ends over the backdrop closes the dialog.
      onPointerDown={(e) => e.target === e.currentTarget && dismiss()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="relative w-full max-w-[360px] bg-white border border-gray-300 rounded-lg shadow-lg p-6"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          <CloseIcon className="h-3.5" />
        </button>

        <h1 id="auth-title" className="text-2xl font-bold text-gray-800 mb-5">
          {isSignUp ? "Sign up" : "Sign in"}
        </h1>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
          {isSignUp && (
            <input name="name" placeholder="Name" autoComplete="name" className={INPUT} autoFocus />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            className={INPUT}
            autoFocus={!isSignUp}
          />
          <input
            name="password"
            type="password"
            placeholder={isSignUp ? `Password (${MIN_PASSWORD}+ characters)` : "Password"}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            className={INPUT}
          />

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-1 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-60 cursor-pointer"
          >
            {isPending ? "Please wait…" : isSignUp ? "Sign up" : "Sign in"}
          </button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-600">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          {/* replace: switching forms must not add a history step, so "back" still closes.
              scroll={false}: by default Next scrolls the page to the new dialog (end of body). */}
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            replace
            scroll={false}
            className="text-gray-800 font-medium underline"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
}
