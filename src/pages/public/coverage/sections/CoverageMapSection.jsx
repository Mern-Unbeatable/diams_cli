import { COVERAGE_MAP } from "@/config/coverage";

const CoverageMapSection = () => {
  const { label, title, description, image, legend } = COVERAGE_MAP;

  return (
    <section className="page-section bg-[#eef4fa]">
      <div className="mx-auto container px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-btnPrimary sm:text-sm">
              {label}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-primary/65 sm:text-base">
              {description}
            </p>

            <ul className="mt-8 space-y-3">
              {legend.map(({ id, label: legendLabel, color }) => (
                <li key={id} className="flex items-center gap-3">
                  <span className={`h-3 w-3 shrink-0 rounded-full ${color}`} />
                  <span className="text-sm font-medium text-primary">
                    {legendLabel}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <img
              src={image}
              alt="NovaSky coverage map of Switzerland"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageMapSection;
