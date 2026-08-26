import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_SECTION } from "@/config/faq";

const FaqItem = ({ item, isOpen, onToggle }) => {
  return (
    <article className="rounded-xl border border-btnPrimary/25">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="text-sm font-medium text-white sm:text-base">
          {item.question}
        </span>
        <ChevronDown
          size={20}
          strokeWidth={2}
          className={`shrink-0 text-textAccent transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-white/10 px-5 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4">
          <p className="text-sm leading-relaxed text-white sm:text-base">
            {item.answer}
          </p>
        </div>
      )}
    </article>
  );
};

const FaqSection = ({ title = FAQ_SECTION.title, items = FAQ_SECTION.items }) => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20 lg:px-10">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
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
