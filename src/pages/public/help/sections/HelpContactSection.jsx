import { Mail, MessageCircle, Phone, Users } from "lucide-react";
import { HELP_CONTACT } from "@/config/help";

const CONTACT_ICONS = {
  chat: MessageCircle,
  email: Mail,
  phone: Phone,
  business: Users,
};

const HelpContactSection = () => {
  const { title, subtitle, methods } = HELP_CONTACT;

  return (
    <section className="page-section bg-[#eef4fa]">
      <div className="mx-auto container px-4 sm:px-6 lg:px-10">
        <h2 className="text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
        <p className="mt-2 text-sm text-primary/65 sm:text-base">{subtitle}</p>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {methods.map(({ id, icon, title: methodTitle, description, action, footer, footerType }) => {
            const Icon = CONTACT_ICONS[icon];

            return (
              <li
                key={id}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <Icon
                  size={24}
                  strokeWidth={1.75}
                  className="text-textsecondary"
                />
                <h3 className="mt-4 text-lg font-bold text-primary">{methodTitle}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-primary/60">
                  {description}
                </p>
                <button
                  type="button"
                  className="mt-5 w-full rounded-lg border border-btnPrimary py-3 text-sm font-semibold text-btnPrimary transition-colors hover:bg-btnPrimary/5"
                >
                  {action}
                </button>
                <p className="mt-3 flex items-center justify-center gap-2 text-xs text-primary/55">
                  {footerType === "status" && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  )}
                  {footer}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default HelpContactSection;
