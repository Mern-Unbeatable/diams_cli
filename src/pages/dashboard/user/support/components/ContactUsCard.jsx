import { ChevronRight, Mail, MessageSquare, Phone } from "lucide-react";

export const ContactUsCard = ({ onStartChat, onOpenNewTicket }) => {
  return (
    <section className="rounded-xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
      <div>
        <h3 className="text-sm sm:text-base font-bold text-primary">
          Contact us
        </h3>
        <p className="text-[11px] text-primary/50 mt-0.5">
          Our support team is available 24/7.
        </p>
      </div>

      <div className="divide-y divide-gray-100 text-xs">
        {/* Live Chat */}
        <button
          type="button"
          onClick={onStartChat}
          className="flex w-full items-center justify-between py-3 first:pt-1 text-left hover:bg-gray-50/60 -mx-2 px-2 rounded-xl transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-[#0284c7] border border-sky-100 group-hover:scale-105 transition-transform">
              <MessageSquare size={15} />
            </span>
            <div>
              <p className="font-bold text-primary group-hover:text-btnPrimary transition-colors">
                Live Chat
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-600">
                  Available
                </span>
              </div>
            </div>
          </div>
          <ChevronRight
            size={14}
            className="text-primary/30 group-hover:text-btnPrimary group-hover:translate-x-0.5 transition-all"
          />
        </button>

        {/* Open a Ticket */}
        <button
          type="button"
          onClick={onOpenNewTicket}
          className="flex w-full items-center justify-between py-3 text-left hover:bg-gray-50/60 -mx-2 px-2 rounded-xl transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-[#0284c7] border border-sky-100 group-hover:scale-105 transition-transform">
              <Mail size={15} />
            </span>
            <div>
              <p className="font-bold text-primary group-hover:text-btnPrimary transition-colors">
                Open a Ticket
              </p>
              <p className="text-[10px] text-primary/45 mt-0.5">
                We'll reply by email
              </p>
            </div>
          </div>
          <ChevronRight
            size={14}
            className="text-primary/30 group-hover:text-btnPrimary group-hover:translate-x-0.5 transition-all"
          />
        </button>

        {/* Phone Hotline */}
        <a
          href="tel:+41800123456"
          className="flex w-full items-center justify-between py-3 last:pb-0 text-left hover:bg-gray-50/60 -mx-2 px-2 rounded-xl transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-[#0284c7] border border-sky-100 group-hover:scale-105 transition-transform">
              <Phone size={15} />
            </span>
            <div>
              <p className="font-bold text-primary font-mono group-hover:text-btnPrimary transition-colors">
                +41 800 123 456
              </p>
              <p className="text-[10px] text-primary/45 mt-0.5">
                24/7 Customer Support
              </p>
            </div>
          </div>
          <ChevronRight
            size={14}
            className="text-primary/30 group-hover:text-btnPrimary group-hover:translate-x-0.5 transition-all"
          />
        </a>
      </div>
    </section>
  );
};
