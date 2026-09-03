import { MessageSquare, Phone, Wifi } from "lucide-react";
import { USER_USAGE } from "@/config/userUsage";

export const UsagePlanSummaryWidget = () => {
  const { sidebarSummary } = USER_USAGE;

  return (
    <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <h3 className="text-sm font-bold text-primary">Your plan summary</h3>

      <div className="space-y-4">
        {sidebarSummary.map((item) => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {item.id === "data" && (
                  <Wifi size={14} className="text-btnPrimary" />
                )}
                {item.id === "calls" && (
                  <Phone size={14} className="text-emerald-500" />
                )}
                {item.id === "sms" && (
                  <MessageSquare size={14} className="text-purple-500" />
                )}
                {item.id === "hotspot" && (
                  <Wifi size={14} className="text-primary/45" />
                )}
                <span className="font-semibold text-primary">{item.label}</span>
              </div>
              <span
                className={`font-semibold ${
                  item.isLink ? "text-btnPrimary" : "text-primary/70"
                }`}
              >
                {item.value}
              </span>
            </div>

            {!item.isLink && (
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${item.style}`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default UsagePlanSummaryWidget;
