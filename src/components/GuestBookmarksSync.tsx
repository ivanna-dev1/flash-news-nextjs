"use client";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";
import { postBookmark } from "@/lib/bookmarkClient";
import { readGuestBookmarks, writeGuestBookmarks } from "@/lib/guestBookmarks";

// In dev React runs effects twice; this flag stops a second, parallel move.
let isMoving = false;

// Mounted once in the layout (not in useBookmarks, which every card calls).
// After sign-in it moves the guest bookmarks from this browser to the account.
export default function GuestBookmarksSync() {
  const queryClient = useQueryClient();
  const userId = useSession().data?.user.id;

  useEffect(() => {
    if (!userId || isMoving) return;
    const guest = readGuestBookmarks();
    if (guest.length === 0) return;
    isMoving = true;

    (async () => {
      try {
        const results = await Promise.allSettled(guest.map((b) => postBookmark(b)));
        // Remove from this browser what is done: saved, or refused for good (400 / 422 =
        // bad data). Keep what can work next time: no network, 401, 429, server errors.
        const done = new Set(
          guest
            .filter((_, i) => {
              const r = results[i];
              if (r.status === "rejected") return false;
              const status = r.value.status;
              return r.value.ok || status === 400 || status === 422;
            })
            .map((b) => b.id),
        );
        // Read again: the list could change while the requests ran.
        writeGuestBookmarks(readGuestBookmarks().filter((b) => !done.has(b.id)));
        // The guest list is in the account now; do not show it after sign-out.
        queryClient.removeQueries({ queryKey: ["bookmarks", "guest"] });
        queryClient.invalidateQueries({ queryKey: ["bookmarks", userId] });
      } finally {
        isMoving = false;
      }
    })();
  }, [userId, queryClient]);

  return null;
}
