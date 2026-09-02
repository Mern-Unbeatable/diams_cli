import { Copy } from "lucide-react";
import { USER_MY_LINE } from "@/config/userMyLine";

const DetailRow = ({ label, value, highlight, copy, onCopy }) => (
  <div className="flex items-center justify-between gap-4 border-b border-gray-100/80 py-3.5 first:pt-4 last:border-b-0 last:pb-0">
    <span className="text-sm font-normal text-gray-400">{label}</span>
    <span className="flex items-center gap-2 text-sm font-bold text-[#0b1736]">
      <span className={highlight ? "text-[#16a34a]" : ""}>{value}</span>
      {copy ? (
        <button
          type="button"
          onClick={onCopy}
          className="text-gray-400 transition-colors hover:text-[#258bf5]"
          aria-label={`Copy ${label}`}
        >
          <Copy size={15} strokeWidth={2} />
        </button>
      ) : null}
    </span>
  </div>
);

export const LineInformationCard = () => {
  const { lineInfo } = USER_MY_LINE;

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text.replace(/\s/g, ""));
  };

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 sm:p-7 shadow-xs">
      <h3 className="text-xl font-bold tracking-tight text-[#0b1736]">
        Line Information
      </h3>
      <div className="mt-2">
        {lineInfo.map((item) => (
          <DetailRow
            key={item.label}
            label={item.label}
            value={item.value}
            highlight={item.highlight}
            copy={item.copy}
            onCopy={() => handleCopy(item.value)}
          />
        ))}
      </div>
    </section>
  );
};

export default LineInformationCard;
