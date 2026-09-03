import { Link } from "react-router";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Download,
} from "lucide-react";
import { HELP_EMERGENCY, HELP_RESOURCES } from "@/config/help";

const RESOURCE_ICONS = {
  guides: BookOpen,
  status: BarChart3,
  downloads: Download,
};

const HelpResourcesSection = () => {
  const { title, description, button } = HELP_EMERGENCY;
  const {
    title: resourcesTitle,
    description: resourcesDescription,
    items,
  } = HELP_RESOURCES;

  return (
    <section className="page-section bg-white">
      <div className="mx-auto flex flex-col gap-6 container px-4 sm:px-6 lg:gap-8 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-5 rounded-xl border border-red-200 bg-red-50 px-5 py-5 sm:flex-row sm:items-center sm:px-6 sm:py-6">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">
              <AlertCircle
                size={22}
                className="text-red-600"
                strokeWidth={1.75}
              />
            </span>
            <div>
              <p className="font-bold text-red-700">{title}</p>
              <p className="mt-1 text-sm text-red-600/90">{description}</p>
            </div>
          </div>

          <Link
            to={button.path}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {button.label}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center lg:gap-10">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-btnPrimary/10">
                <BookOpen
                  size={24}
                  strokeWidth={1.75}
                  className="text-textsecondary"
                />
              </span>
              <div>
                <h2 className="text-xl font-bold text-primary sm:text-2xl">
                  {resourcesTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-primary/65 sm:text-base">
                  {resourcesDescription}
                </p>
              </div>
            </div>

            <ul className="grid gap-6 sm:grid-cols-3">
              {items.map(
                ({ id, icon, title: itemTitle, description: itemDesc }) => {
                  const Icon = RESOURCE_ICONS[icon];

                  return (
                    <li key={id}>
                      <Link to="/help" className="group block">
                        <Icon
                          size={22}
                          strokeWidth={1.75}
                          className="text-textsecondary"
                        />
                        <p className="mt-3 font-bold text-primary">
                          {itemTitle}
                        </p>
                        <p className="mt-1 text-sm text-primary/60">
                          {itemDesc}
                        </p>
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpResourcesSection;
