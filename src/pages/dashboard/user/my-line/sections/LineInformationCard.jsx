import { Copy } from "lucide-react";
import { USER_MY_LINE } from "@/config/userMyLine";

const DetailRow = ({ label, value, highlight, copy, onCopy }) => (
  <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-3 last:border-b-0">
    <span className="text-sm text-primary/55">{label}</span>
    <span className="flex items-center gap-2 text-sm font-semibold text-primary">
      <span className={highlight ?? ""}>{value}</span>
      {copy ? (
        <button
          type="button"
          onClick={onCopy}
          className="text-primary/40 transition-colors hover:text-btnPrimary"
          aria-label={`Copy ${label}`}
        >
          <Copy size={14} />
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
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h3 className="text-base font-bold text-primary">Line Information</h3>
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
