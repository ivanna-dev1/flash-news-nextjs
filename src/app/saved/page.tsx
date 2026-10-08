import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import SavedList from "@/components/SavedList";

export const metadata: Metadata = {
  title: "Saved",
  robots: { index: false },
};

// The list is client-side: guest bookmarks live in the browser (localStorage).
export default function SavedPage() {
  return (
    <div>
      <Breadcrumbs title="Saved" />
      <h1 className="text-3xl font-semibold text-center text-gray-700 p-1 mb-5">Saved articles</h1>
      <SavedList />
    </div>
  );
}
