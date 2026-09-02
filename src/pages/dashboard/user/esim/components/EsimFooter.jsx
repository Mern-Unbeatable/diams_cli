import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export const EsimFooter = () => {
  const [lang, setLang] = useState("English");
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <footer className="mt-8 flex flex-col gap-4 border-t border-gray-200/80 pt-6 text-[11px] text-primary/50 sm:flex-row sm:items-center sm:justify-between">
      {/* Copyright */}
      <p>© 2024 NovaSky. All rights reserved.</p>

      {/* Links */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <Link
          to="/terms"
          className="transition-colors hover:text-primary hover:underline"
        >
          Terms & Conditions
        </Link>
        <Link
          to="/privacy"
          className="transition-colors hover:text-primary hover:underline"
        >
          Privacy Policy
        </Link>
        <Link
          to="/legal"
          className="transition-colors hover:text-primary hover:underline"
        >
          Legal Notice
        </Link>
      </div>

      {/* Language Selector */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="inline-flex items-center gap-1.5 font-semibold text-primary/70 hover:text-primary transition-colors"
        >
          {/* Swiss Flag SVG */}
          <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[2px] bg-[#d52b1e] text-[9px] font-bold leading-none text-white shadow-xs">
            +
          </span>
          <span>{lang}</span>
          <ChevronDown size={13} className="text-primary/40" />
        </button>

        {isLangOpen && (
          <div className="absolute bottom-full right-0 mb-2 w-32 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg z-20 text-xs">
            {["English", "Deutsch", "Français", "Italiano"].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  setLang(l);
                  setIsLangOpen(false);
                }}
                className={`w-full rounded-lg px-2.5 py-1.5 text-left font-medium transition-colors ${
                  lang === l
                    ? "bg-sky-50 text-btnPrimary font-bold"
                    : "text-primary hover:bg-gray-50"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
};
