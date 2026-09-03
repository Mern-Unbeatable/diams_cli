import { Link } from "react-router";
import { ArrowRight, Home, SearchX } from "lucide-react";
import { NOT_FOUND_PAGE } from "@/config/notFound";

const NotFound = () => {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-br from-primary via-primary to-[#002a66]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-btnPrimary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-btnPrimary/5 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-20rem)] container flex-col items-center justify-center px-5 py-20 text-center sm:px-6 lg:px-10">
        <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
          <SearchX size={36} strokeWidth={1.5} className="text-textAccent" />
        </div>

        <p className="mt-8 text-7xl font-bold tracking-tight text-textAccent sm:text-8xl">
          {NOT_FOUND_PAGE.code}
        </p>

        <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          {NOT_FOUND_PAGE.title}
        </h1>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
          {NOT_FOUND_PAGE.description}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Link
            to={NOT_FOUND_PAGE.primaryCta.path}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-btnPrimary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:min-w-44"
          >
            <Home size={18} />
            {NOT_FOUND_PAGE.primaryCta.label}
          </Link>

          <Link
            to={NOT_FOUND_PAGE.secondaryCta.path}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:min-w-44"
          >
            {NOT_FOUND_PAGE.secondaryCta.label}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
