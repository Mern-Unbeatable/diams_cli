import { Mail, MessageCircle, Phone } from "lucide-react";
import { NEED_HELP } from "@/config/verification";

const CONTACT_ICONS = {
  message: MessageCircle,
  mail: Mail,
  phone: Phone,
};

const NeedHelpCard = () => {
  return (
    <article className="rounded-2xl bg-[#eef4fa] px-5 py-6 sm:px-6">
      <h3 className="text-base font-bold text-primary">{NEED_HELP.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-primary/65">
        {NEED_HELP.description}
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
    </article>
  );
};

export default NeedHelpCard;
