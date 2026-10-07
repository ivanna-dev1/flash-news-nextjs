"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import useBookmarks from "@/hooks/useBookmarks";
import { HEADER_BUTTON, UserIcon } from "./HeaderIcons";

interface AccountMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AccountMenu({ isOpen, setIsOpen }: AccountMenuProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const { data: session, isPending } = useSession();
  const user = session?.user;
  // Same cache as the cards: no extra request.
  const { bookmarks, isLoading } = useBookmarks();

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

  // The session is still loading: same icon, no action yet. Without this a signed-in
  // user gets the sign-in dialog for a moment after the page opens.
  // A guest also waits for the bookmark list, or the icon shows "Sign in" for a moment.
  if (isPending || (!user && isLoading)) {
    return (
      <span aria-hidden="true" className={HEADER_BUTTON}>
        <UserIcon className="h-[0.7em]" />
      </span>
    );
  }

  // A guest with no bookmarks has nothing in the menu: the icon opens the sign-in dialog.
  if (!user && bookmarks.length === 0) {
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
            {user ? (
              <>
                <p className="font-medium truncate">{user.name}</p>
                <p className="text-sm text-gray-400 truncate">{user.email}</p>
              </>
            ) : (
              // A guest with bookmarks: they are only in this browser.
              <>
                <p className="font-medium">Not signed in</p>
                <p className="text-sm text-gray-400">Saved on this device</p>
              </>
            )}
          </div>
          <Link
            href="/saved"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 hover:bg-gray-700"
          >
            Saved
          </Link>
          {user ? (
            <button
              onClick={async () => {
                setIsOpen(false);
                try {
                  await signOut();
                } catch {
                  // No network: the session stays, the menu shows the user again.
                }
              }}
              className="block w-full text-left px-3 py-2 hover:bg-gray-700 cursor-pointer"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/sign-in"
              scroll={false}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 hover:bg-gray-700"
            >
              Sign in
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
