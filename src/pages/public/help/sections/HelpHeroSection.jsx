import { Clock, Headset, MapPin } from "lucide-react";
import { HELP_HERO, HELP_SUPPORT_HIGHLIGHTS } from "@/config/help";

const HIGHLIGHT_ICONS = {
  headset: Headset,
  map: MapPin,
  clock: Clock,
};

const HelpHeroSection = () => {
  const { title, subtitle, searchPlaceholder, searchLabel, popularLabel, popularSearches } =
    HELP_HERO;

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative min-h-[620px] sm:min-h-[700px] lg:min-h-[760px]">
        <img
          src={HELP_HERO.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/70 to-primary/15 sm:from-primary/90 sm:via-primary/50 sm:to-transparent"
        />

        <div className="relative z-10 mx-auto flex min-h-[620px] items-center container px-4 py-14 sm:min-h-[700px] sm:px-6 sm:py-16 lg:min-h-[760px] lg:px-10 lg:py-20">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 xl:gap-14">
            <div className="min-w-0">
              <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight xl:text-6xl">
                {title}
              </h1>
              <p className="mt-3 text-sm text-white/90 sm:text-base lg:text-lg">
                {subtitle}
              </p>

              <form
                className="mt-8 max-w-2xl"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="flex items-center rounded-lg bg-white p-1.5 shadow-sm">
                  <input
                    type="search"
                    placeholder={searchPlaceholder}
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-primary outline-none placeholder:text-gray-400 sm:py-3.5 sm:text-base"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-md bg-btnPrimary px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:px-8 sm:py-3.5"
                  >
                    {searchLabel}
                  </button>
                </div>
              </form>

              <div className="mt-6 max-w-2xl">
                <p className="text-sm text-white/90">{popularLabel}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <li key={term}>
                      <button
                        type="button"
                        className="rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/15"
                      >
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="rounded-2xl border border-white/20 bg-primary/55 p-6 shadow-xl backdrop-blur-md sm:p-7 lg:max-w-md lg:justify-self-end lg:p-8">
              <h2 className="text-lg font-bold text-white sm:text-xl">
                {HELP_SUPPORT_HIGHLIGHTS.title}
              </h2>

              <ul className="mt-6 space-y-7">
                {HELP_SUPPORT_HIGHLIGHTS.items.map(({ id, icon, title: itemTitle, description }) => {
                  const Icon = HIGHLIGHT_ICONS[icon];

                  return (
                    <li key={id} className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-btnPrimary">
                        <Icon
                          size={18}
                          strokeWidth={1.75}
                          className="text-white"
                        />
                      </span>
                      <div className="pt-0.5">
                        <p className="text-sm font-bold text-white sm:text-base">
                          {itemTitle}
                        </p>
                        <p className="mt-1 text-sm text-white/70">{description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpHeroSection;
