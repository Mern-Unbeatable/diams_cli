import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_SECTION } from "@/config/faq";

const FaqItem = ({ item, isOpen, onToggle, variant }) => {
  const isLight = variant === "light";

  return (
    <article
      className={
        isLight
          ? "overflow-hidden rounded-xl border border-gray-200 bg-[#f8fafc]"
          : "rounded-lg border border-btnPrimary/25 bg-primary"
      }
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-[18px]"
      >
        <span
          className={`text-sm font-medium sm:text-base ${
            isLight ? "text-primary" : "text-white"
          }`}
        >
          {item.question}
        </span>
        <ChevronDown
          size={18}
          strokeWidth={2}
          className={`shrink-0 transition-transform duration-200 ${
            isLight ? "text-primary/50" : "text-textsecondary"
          } ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`px-5 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4 ${
            isLight ? "border-t border-gray-200" : "border-t border-white/10"
          }`}
        >
          <p
            className={`text-sm leading-relaxed sm:text-base ${
              isLight ? "text-primary/70" : "text-white/85"
            }`}
          >
            {item.answer}
          </p>
        </div>
      )}
    </article>
  );
};

const FaqSection = ({
  title = FAQ_SECTION.title,
  items = FAQ_SECTION.items,
  align = "center",
  variant = "dark",
}) => {
  const [openId, setOpenId] = useState(null);
  const isLight = variant === "light";
  const isCentered = align === "center";

  return (
    <section className={isLight ? "page-section bg-white" : "bg-primary"}>
      <div
        className={`mx-auto max-w-5xl px-5 sm:px-6 lg:px-10 ${
          isLight ? "" : "py-14 sm:py-16 lg:py-20"
        }`}
      >
        <h2
          className={`text-xl font-bold lg:text-2xl ${
            isLight ? "text-primary" : "text-white"
          } ${
            isCentered
              ? "text-center sm:text-3xl lg:text-4xl"
              : ""
          }`}
        >
          {title}
        </h2>

        <div className="mt-10 grid gap-4">
          {items.map((item) => (
            <FaqItem
              key={item.id}
              item={item}
              variant={variant}
              isOpen={openId === item.id}
              onToggle={() =>
                setOpenId((current) => (current === item.id ? null : item.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
