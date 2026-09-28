// Outline bookmark icon for the "save" buttons on the cards.
// It is SVG, not a font symbol: a symbol looks different in every font,
// SVG looks the same everywhere. Size comes from className (e.g. "size-6"),
// colour from the text colour (currentColor).
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
