import { Plus } from "lucide-react";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

const SocialIcons = () => (
  <div className="grid grid-cols-2 gap-0.5 w-8 h-8 p-0.5 bg-gray-50 rounded-lg shrink-0 border border-gray-100">
    <div className="text-[7px] flex items-center justify-center font-bold text-pink-600 bg-pink-50/50 rounded-sm leading-none">IG</div>
    <div className="text-[7px] flex items-center justify-center font-bold text-emerald-600 bg-emerald-50/50 rounded-sm leading-none">WA</div>
    <div className="text-[7px] flex items-center justify-center font-bold text-blue-600 bg-blue-50/50 rounded-sm leading-none">FB</div>
    <div className="text-[7px] flex items-center justify-center font-bold text-gray-800 bg-gray-200/50 rounded-sm leading-none">TT</div>
  </div>
);

const ServicesTab = () => {
  const { quickAdd } = USER_PLANS_OPTIONS;
  const items = quickAdd.filter((item) => item.icon === "social");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-primary">Services</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="relative flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4"
          >
            <SocialIcons />

            <div className="min-w-0 flex-1 pr-6">
              <h4 className="truncate text-xs font-bold text-primary" title={item.title}>
                {item.title}
              </h4>
              <p className="mt-0.5 truncate text-[10px] text-primary/45">{item.description}</p>
              <p className="mt-2 text-xs font-bold text-primary">CHF {item.price}</p>
            </div>

            <button
              type="button"
              className="absolute bottom-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-btnPrimary text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
              aria-label={`Add ${item.title}`}
            >
              <Plus size={14} strokeWidth={2.5} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesTab;
