import { Globe, Phone, Signal, Wifi } from "lucide-react";
import { COVERAGE_NETWORK } from "@/config/coverage";

const FEATURE_ICONS = {
  wifi: Wifi,
  signal: Signal,
  phone: Phone,
  globe: Globe,
};

const CoverageNetworkSection = () => {
  const { title, subtitle, features } = COVERAGE_NETWORK;

  return (
    <section className="page-section bg-white">
      <div className="mx-auto container px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-sm text-primary/65 sm:text-base">
            {subtitle}
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map(({ id, icon, title: featureTitle, description }) => {
            const Icon = FEATURE_ICONS[icon];

            return (
              <li
                key={id}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-btnPrimary/10">
                  <Icon
                    size={20}
                    strokeWidth={1.75}
                    className="text-textsecondary"
                  />
                </div>
                <h3 className="mt-4 text-lg font-bold text-primary">
                  {featureTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-primary/65">
                  {description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default CoverageNetworkSection;
