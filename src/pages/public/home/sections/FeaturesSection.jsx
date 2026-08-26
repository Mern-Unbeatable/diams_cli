import { Link } from "react-router";
import {
  ArrowRight,
  Building2,
  Gauge,
  Headset,
  Infinity,
  MapPinned,
  Phone,
  Radio,
  Smartphone,
} from "lucide-react";
import { FEATURE_CARDS, FEATURE_HIGHLIGHTS } from "@/config/features";

const HIGHLIGHT_ICONS = {
  gauge: Gauge,
  map: MapPinned,
  phone: Phone,
  infinity: Infinity,
};

const CARD_ICONS = {
  sim: Smartphone,
  tower: Radio,
  building: Building2,
  support: Headset,
};

const FeatureHighlight = ({ feature }) => {
  const Icon = HIGHLIGHT_ICONS[feature.icon];

  return (
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary lg:h-16 lg:w-16">
        <Icon size={22} className="text-textAccent" strokeWidth={2} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-white lg:text-lg">
        {feature.title}
      </h3>
      <p className="mt-2 text-sm xl:text-base leading-relaxed text-white">{feature.description}</p>
    </div>
  );
};

const FeatureCard = ({ feature }) => {
  const Icon = CARD_ICONS[feature.icon];

  return (
    <article className="flex flex-col items-start justify-start rounded-xl bg-secondary px-6 py-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
        <Icon size={26} className="text-textAccent" strokeWidth={1.75} />
      </div>

      <h3 className="mt-3 text-lg xl:text-xl font-semibold text-white">{feature.title}</h3>
      <p className="mt-2 text-left text-sm xl:text-base text-white">{feature.description}</p>

      <Link
        to={feature.cta.path}
        className="mt-4 inline-flex items-center gap-2 rounded-md bg-btnPrimary px-5 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
      >
        {feature.cta.label}
        <ArrowRight size={16} />
      </Link>
    </article>
  );
};

const FeaturesSection = ({
  highlights = FEATURE_HIGHLIGHTS,
  cards = FEATURE_CARDS,
}) => {
  return (
    <section className="bg-primary">
      <div className="mx-auto container px-5 py-14 sm:px-6 sm:py-20 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {highlights.map((feature) => (
            <FeatureHighlight key={feature.id} feature={feature} />
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {cards.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
