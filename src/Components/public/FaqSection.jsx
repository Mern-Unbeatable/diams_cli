import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_SECTION } from "@/config/faq";

const FaqItem = ({ item, isOpen, onToggle }) => {
  return (
    <article className="rounded-lg border border-btnPrimary/25 bg-primary">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-[18px]"
      >
        <span className="text-sm font-medium text-white sm:text-base">
          {item.question}
        </span>
        <ChevronDown
          size={18}
          strokeWidth={2}
          className={`shrink-0 text-textsecondary transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-white/10 px-5 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4">
          <p className="text-sm leading-relaxed text-white/85 sm:text-base">
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
  columns = 2,
}) => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const isCentered = align === "center";
  const gridClass =
    columns === 1
      ? "grid gap-3"
      : "grid gap-4 sm:grid-cols-2";

  return (
    <section className="bg-primary">
      <div
        className={`mx-auto px-5 sm:px-6 lg:px-10 ${
          columns === 1 ? "" : "py-14 sm:py-16"
        } ${columns === 1 ? "container" : "max-w-5xl"}`}
      >
        <h2
          className={`text-xl font-bold text-white lg:text-2xl ${
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
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
