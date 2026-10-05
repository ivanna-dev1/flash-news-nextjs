export default function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
      aria-hidden="true"
      className={`block ${className ?? ""}`}
    >
      <path d="M20 21 12 13.44 4 21V3h16z" />
    </svg>
  );
}
