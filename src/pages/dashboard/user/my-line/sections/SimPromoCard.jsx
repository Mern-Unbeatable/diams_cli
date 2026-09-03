import { Link } from "react-router";
import { Smartphone } from "lucide-react";
import { USER_MY_LINE } from "@/config/userMyLine";

export const SimPromoCard = () => {
  const { simPromo } = USER_MY_LINE;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef7ff]">
          <Smartphone size={18} className="text-btnPrimary" />
        </span>
        <div>
          <h3 className="font-bold text-primary">{simPromo.title}</h3>
          <p className="mt-1 text-sm text-primary/55">{simPromo.description}</p>
          <Link
            to={simPromo.path}
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-btnPrimary hover:opacity-80"
          >
            {simPromo.linkLabel} →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SimPromoCard;
