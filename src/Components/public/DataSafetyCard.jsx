import { ShieldCheck } from "lucide-react";

const DataSafetyCard = () => {
  return (
    <article className="rounded-2xl border border-gray-100 bg-[#f0f6fc] p-6 text-center">
      <h3 className="text-base font-bold text-primary">Your data is safe</h3>
      <p className="mt-2 text-sm leading-relaxed text-primary/70">
        We use bank-level encryption to protect your personal information.
      </p>
      <div className="mx-auto mt-5 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
        <ShieldCheck size={28} strokeWidth={1.75} className="text-btnPrimary" />
      </div>
    </article>
  );
};

export default DataSafetyCard;
