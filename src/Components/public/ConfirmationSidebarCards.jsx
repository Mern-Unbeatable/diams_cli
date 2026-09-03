import { Gift, Headphones, Mail, MessageCircle, Phone } from "lucide-react";
import { CONFIRMATION_HELP, THANK_YOU_GIFT } from "@/config/confirmation";
import { NEED_HELP } from "@/config/verification";

const CONTACT_ICONS = {
  message: MessageCircle,
  mail: Mail,
  phone: Phone,
};

export const ThankYouGiftCard = () => {
  return (
    <article className="rounded-xl bg-[#eef4fa] px-5 py-6 sm:px-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-btnPrimary/15">
          <Gift size={20} strokeWidth={1.75} className="text-btnPrimary" />
        </div>
        <div>
          <h3 className="text-base font-bold text-primary">
            {THANK_YOU_GIFT.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-primary/65">
            {THANK_YOU_GIFT.description}
          </p>
          <div className="mt-4 inline-block rounded-lg border border-dashed border-btnPrimary/40 bg-white px-4 py-2.5">
            <span className="text-base font-bold tracking-wide text-btnPrimary">
              {THANK_YOU_GIFT.code}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export const ConfirmationHelpCard = () => {
  return (
    <article className="rounded-xl bg-[#edf8f0] px-5 py-6 sm:px-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
          <Headphones
            size={20}
            strokeWidth={1.75}
            className="text-emerald-600"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-primary">
            {CONFIRMATION_HELP.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-primary/65">
            {CONFIRMATION_HELP.description}
          </p>

          <ul className="mt-5 space-y-3">
            {NEED_HELP.contacts.map(({ id, icon, label }) => {
              const Icon = CONTACT_ICONS[icon];

              return (
                <li key={id}>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-sm font-medium text-btnPrimary transition-opacity hover:opacity-80"
                  >
                    <Icon size={18} strokeWidth={1.75} className="shrink-0" />
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
};
