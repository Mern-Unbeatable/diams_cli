import { Link } from "react-router";
import { ArrowRight, CheckCircle2, User } from "lucide-react";
import { ACCOUNT_PAGE, ACCOUNT_QUICK_LINKS } from "@/config/account";

const AccountView = () => {
  return (
    <>
      <section className="overflow-x-hidden bg-primary pb-10 pt-8 sm:pb-12 sm:pt-10">
        <div className="mx-auto container px-5 sm:px-6 lg:px-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <User size={26} strokeWidth={1.75} className="text-textAccent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                {ACCOUNT_PAGE.title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-white/70 sm:text-base">
                {ACCOUNT_PAGE.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-x-hidden bg-white pb-16 pt-8 sm:pb-20 sm:pt-10">
        <div className="mx-auto container px-5 sm:px-6 lg:px-10">
          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 sm:px-5">
            <CheckCircle2
              size={22}
              strokeWidth={1.75}
              className="mt-0.5 shrink-0 text-emerald-600"
            />
            <div>
              <p className="font-bold text-emerald-900">
                {ACCOUNT_PAGE.welcomeTitle}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-emerald-800">
                {ACCOUNT_PAGE.welcomeMessage}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ACCOUNT_QUICK_LINKS.map(({ id, label, description, path }) => (
              <Link
                key={id}
                to={path}
                className="group rounded-xl border border-gray-200 bg-white p-5 transition-colors hover:border-btnPrimary/30 hover:bg-[#f8fbff] sm:p-6"
              >
                <p className="font-bold text-primary">{label}</p>
                <p className="mt-2 text-sm leading-relaxed text-primary/65">
                  {description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-btnPrimary">
                  Continue
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountView;
