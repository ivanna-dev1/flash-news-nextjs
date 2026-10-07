// The paths fill the whole viewBox, so h-[0.7em] equals the cap height of the logo.

// Square header button. Sizes are in em of --hs (set on <header>), so on narrow
// phones the buttons shrink together with the logo. 1.067em = 32px at 30px.
export const HEADER_BUTTON =
  "w-[1.067em] h-[1.067em] shrink-0 flex items-center justify-center text-[length:var(--hs)] cursor-pointer";

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

export function UserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...svgProps} className={`block w-auto ${className ?? ""}`}>
      <circle cx="10" cy="6" r="5" />
      <path d="M1 19c0-4.4 4-7 9-7s9 2.6 9 7" />
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
