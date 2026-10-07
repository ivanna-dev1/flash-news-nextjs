interface BookmarkIconProps {
  className?: string;
  // Filled = the article is saved.
  filled?: boolean;
}

export default function BookmarkIcon({ className, filled = false }: BookmarkIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
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
