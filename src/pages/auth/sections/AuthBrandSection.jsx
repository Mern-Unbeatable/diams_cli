import { Link } from "react-router";
import { Globe, ShieldCheck, Smartphone } from "lucide-react";
import { AUTH_PAGE } from "@/config/auth";
import { BRAND, LOGO_CLASS } from "@/config/navigation";

const FEATURE_ICONS = {
  globe: Globe,
  smartphone: Smartphone,
  shield: ShieldCheck,
};

const AuthBrandSection = () => {
  const {
    logo,
    brandName,
    image,
    headlineLine1,
    headlineAccent,
    headlineLine2,
    headlineLine3,
    description,
    features,
  } = AUTH_PAGE;

  return (
    <aside className="relative hidden overflow-hidden lg:flex lg:min-h-screen lg:flex-col">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full object-cover object-bottom"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-primary from-0% via-primary/75 via-45% to-primary/5 to-100%"
      />

      <div className="relative z-10 flex min-h-screen flex-col justify-center items-center px-10 py-10 lg:px-14 lg:py-12 xl:px-16">
        <Link to={BRAND.homePath} className="shrink-0">
          <img src={logo} alt={brandName} className={LOGO_CLASS} />
        </Link>

        <div className="flex flex-1 flex-col justify-center pb-28 pt-10 lg:pb-32 lg:pt-12">
          <div className="max-w-md xl:max-w-lg">
            <h1 className="text-[2rem] font-bold leading-[1.2] tracking-tight text-white lg:text-[2.125rem] xl:text-4xl xl:leading-[1.15]">
              <span className="block">{headlineLine1}</span>
              <span className="block">
                <span className="text-textAccent">{headlineAccent}</span> {headlineLine2}
              </span>
              <span className="block">{headlineLine3}</span>
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70 lg:text-[0.9375rem]">
              {description}
            </p>

            <ul className="mt-10 space-y-6">
              {features.map(({ id, icon, title, description: featureDesc }) => {
                const Icon = FEATURE_ICONS[icon];

                return (
                  <li key={id} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Icon
                        size={20}
                        strokeWidth={1.75}
                        className="text-textsecondary"
                      />
                    </span>
                    <div className="pt-0.5">
                      <p className="text-sm font-bold text-white">{title}</p>
                      <p className="mt-1 text-sm text-white/60">{featureDesc}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AuthBrandSection;
