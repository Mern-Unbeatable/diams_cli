import {
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  Lock,
  PhoneCall,
  PhoneForwarded,
  Plane,
  Settings,
  Shield,
  User,
  Voicemail,
  Zap,
} from "lucide-react";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

const SERVICE_ICONS = {
  sim: CreditCard,
  lock: Lock,
  voicemail: Voicemail,
  user: User,
  phoneForward: PhoneForwarded,
  phoneCall: PhoneCall,
  shield: Shield,
  plane: Plane,
};

const ServicesTab = () => {
  const { managedServices = [] } = USER_PLANS_OPTIONS;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-primary sm:text-2xl">
          Managed Services
        </h3>
        <p className="mt-1 text-xs text-primary/55">
          Configure and monitor your active telecommunication services.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {managedServices.map((service) => {
          const Icon = SERVICE_ICONS[service.icon] ?? Settings;

          return (
            <div
              key={service.id}
              className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${service.iconStyle}`}
                  >
                    <Icon size={18} />
                  </span>

                  <div className="flex flex-wrap items-center justify-end gap-1.5">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${service.priceBadge.style}`}
                    >
                      {service.priceBadge.label}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold flex items-center gap-1 ${service.statusBadge.style}`}
                    >
                      {service.statusBadge.label === "Active" && (
                        <CheckCircle2 size={11} className="text-emerald-600" />
                      )}
                      {service.statusBadge.label}
                    </span>
                  </div>
                </div>

                <h4 className="mt-3 text-sm font-bold text-primary">
                  {service.title}
                </h4>

                <p className="mt-2 text-xs text-primary/60 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                {service.footerType === "viewDetailsDeactivate" ? (
                  <button
                    type="button"
                    className="text-xs font-semibold text-btnPrimary hover:underline"
                  >
                    View Details
                  </button>
                ) : (
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary/70 hover:text-primary"
                  >
                    <Settings size={13} />
                    Configure
                  </button>
                )}

                {service.footerType === "orderSim" && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-xl bg-[#111827] px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-black"
                  >
                    <span>{service.buttonText}</span>
                    <ArrowUpRight size={13} />
                  </button>
                )}

                {service.footerType === "purpleActivate" && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-purple-700 shadow-sm"
                  >
                    <Zap size={13} fill="currentColor" />
                    <span>{service.buttonText}</span>
                  </button>
                )}

                {service.footerType === "blueActivate" && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-xl bg-btnPrimary px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-btnPrimary/90 shadow-sm"
                  >
                    <Zap size={13} fill="currentColor" />
                    <span>{service.buttonText}</span>
                  </button>
                )}

                {(service.footerType === "deactivate" ||
                  service.footerType === "viewDetailsDeactivate") && (
                  <button
                    type="button"
                    className="inline-flex items-center rounded-xl bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-100"
                  >
                    {service.buttonText}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesTab;
