// Shown while a page waits for Guardian. Works for all pages inside,
// except the article page: it has its own loading.tsx.
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <p className="text-xl font-medium text-gray-500 animate-pulse">
        Loading news... Please wait.
      </p>
    </div>
  );
}
