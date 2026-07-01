"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Locale } from "../lib/getDictionary";

const LANGS: { locale: Locale; flagUrl: string; label: string }[] = [
  { locale: "es", flagUrl: "https://flagcdn.com/w40/es.webp", label: "Español" },
  { locale: "en", flagUrl: "https://flagcdn.com/w40/gb.webp", label: "English" },
];

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGS.find((l) => l.locale === lang) ?? LANGS[0];

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const switchTo = (locale: Locale) => {
    setOpen(false);
    router.push(`/${locale}`);
  };

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: "1.25rem",
        right: "1.5rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.5rem",
      }}
    >
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.35rem",
          transition: "transform 0.2s ease, background 0.2s ease",
          transform: open ? "scale(1.1)" : "scale(1)",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background =
            "rgba(255,255,255,0.15)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background =
            open ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)")
        }
      >
        <Image 
          src={current.flagUrl} 
          alt={current.label}
          width={22}
          height={16}
          style={{ borderRadius: "2px" }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            background: "rgba(15,15,35,0.92)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            minWidth: "140px",
          }}
        >
          {LANGS.map(({ locale, flagUrl, label }) => {
            const isActive = locale === lang;
            return (
              <button
                key={locale}
                onClick={() => switchTo(locale)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.65rem 1rem",
                  background: isActive
                    ? "rgba(109,40,217,0.25)"
                    : "transparent",
                  border: "none",
                  borderBottom:
                    locale !== LANGS[LANGS.length - 1].locale
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "none",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: isActive ? 600 : 400,
                  transition: "background 0.15s ease",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                }}
              >
                <Image 
                  src={flagUrl} 
                  alt={label} 
                  width={20}
                  height={15}
                  style={{ borderRadius: "2px" }}
                />
                {label}
                {isActive && (
                  <span
                    style={{
                      marginLeft: "auto",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      flexShrink: 0,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
