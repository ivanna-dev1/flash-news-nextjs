"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { HEADER_BUTTON, UserIcon } from "./HeaderIcons";

interface AccountMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AccountMenu({ isOpen, setIsOpen }: AccountMenuProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const user = session?.user;

  // Close on Escape and click outside (same as the menu and search).
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen, setIsOpen]);

  // Not signed in (or the session is still loading): the icon opens the sign-in dialog.
  if (!user) {
    return (
      // scroll={false}: by default Next scrolls the page to the new dialog (end of body).
      <Link href="/sign-in" scroll={false} aria-label="Sign in" className={HEADER_BUTTON}>
        <UserIcon className="h-[0.7em]" />
      </Link>
    );
  }

  return (
    <div ref={boxRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Account menu"
        aria-expanded={isOpen}
        className={HEADER_BUTTON}
      >
        <UserIcon className="h-[0.7em]" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-3 z-60 w-56 py-1 bg-gray-800 border border-gray-700 rounded shadow-lg">
          <div className="px-3 py-2 border-b border-gray-700">
            <p className="font-medium truncate">{user.name}</p>
            <p className="text-sm text-gray-400 truncate">{user.email}</p>
          </div>
          <Link
            href="/saved"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 hover:bg-gray-700"
          >
            Saved
          </Link>
          <button
            onClick={async () => {
              setIsOpen(false);
              await signOut();
            }}
            className="block w-full text-left px-3 py-2 hover:bg-gray-700 cursor-pointer"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
