// Icons for the header buttons: menu, close, search.
// They are SVG, not font symbols ("☰", "X"): a symbol has a different size
// in every font, SVG is the same everywhere.
// The drawing fills the whole viewBox (no empty space around it), so the
// height from className is the real height of the icon. In the header we
// use h-[0.7em]: 0.7 of the font size = the height of the capital letters
// in FLASHNEWS, so all three things in the header are equally tall.
// Colour comes from the text colour (currentColor).

interface IconProps {
  className?: string;
}

const svgProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  "aria-hidden": true,
};

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 20" {...svgProps} className={`block w-auto ${className ?? ""}`}>
      <path d="M1 1h22M1 10h22M1 19h22" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...svgProps} className={`block w-auto ${className ?? ""}`}>
      <path d="M1 1l18 18M19 1L1 19" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...svgProps} className={`block w-auto ${className ?? ""}`}>
      <circle cx="8.5" cy="8.5" r="7.5" />
      <path d="M14 14l5 5" />
    </svg>
  );
}
