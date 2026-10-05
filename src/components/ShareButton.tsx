"use client";
import { useEffect, useRef, useState } from "react";

interface ShareButtonProps {
  // Site path of the article, e.g. "/news/world%2F2026%2F...".
  path: string;
  title: string;
  className?: string;
}

const encode = encodeURIComponent;

const TARGETS = [
  {
    name: "Telegram",
    // Telegram shows the text above the link, so the link is not repeated in it.
    url: (title: string, link: string) => `https://t.me/share/url?url=${encode(link)}&text=${encode(title)}`,
  },
  {
    name: "WhatsApp",
    url: (title: string, link: string) => `https://wa.me/?text=${encode(`${title} ${link}`)}`,
  },
  {
    // App link, works only with Viber installed.
    name: "Viber",
    url: (title: string, link: string) => `viber://forward?text=${encode(`${title} ${link}`)}`,
    isAppLink: true,
  },
  {
    name: "Email",
    url: (title: string, link: string) => `mailto:?subject=${encode(title)}&body=${encode(link)}`,
    isAppLink: true,
  },
];

const OPTION = "block w-full px-3 py-1.5 text-left text-gray-700 hover:bg-gray-100 cursor-pointer";

export default function ShareButton({ path, title, className }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

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
  }, [isOpen]);

  // The menu renders only after a click, so window is always available here.
  const link = () => `${window.location.origin}${path}`;

  const copy = async () => {
    await navigator.clipboard.writeText(link());
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
      setIsOpen(false);
    }, 1200);
  };

  return (
    <div ref={boxRef} className="relative flex">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={className}
      >
        Share
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 z-30 mt-1 w-36 py-1 bg-white border border-gray-300 rounded shadow-lg text-sm">
          {TARGETS.map((target) => (
            <a
              key={target.name}
              href={target.url(title, link())}
              target={target.isAppLink ? undefined : "_blank"}
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className={OPTION}
            >
              {target.name}
            </a>
          ))}
          <button type="button" onClick={copy} className={OPTION}>
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
