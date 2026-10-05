import { ArrowRight, Edit3, Plus, Trash2 } from "lucide-react";

export const EsimManageSection = ({ onRename, onDelete, onGetNew }) => {
  const cards = [
    {
      id: "rename",
      title: "Rename your eSIM",
      description: "Customize your eSIM name to recognize it easily.",
      icon: <Edit3 size={18} />,
      iconBoxClass: "bg-sky-50 text-btnPrimary border-sky-100/80",
      onClick: onRename,
    },
    {
      id: "delete",
      title: "Delete your eSIM",
      description:
        "Remove your eSIM from this device. You can reinstall it later.",
      icon: <Trash2 size={18} />,
      iconBoxClass: "bg-rose-50 text-rose-500 border-rose-100/80",
      onClick: onDelete,
    },
    {
      id: "new",
      title: "Get a new eSIM",
      description: "Replace your current eSIM with a new profile.",
      icon: <Plus size={18} />,
      iconBoxClass: "bg-sky-50 text-btnPrimary border-sky-100/80",
      onClick: onGetNew,
    },
  ];

  return (
    <section className="min-w-0 space-y-4 rounded-xl border border-gray-200/90 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="text-base font-bold text-primary sm:text-lg">
        Manage your eSIM
      </h3>

      <div className="grid min-w-0 gap-3 md:grid-cols-3">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={card.onClick}
            className="group flex min-w-0 items-start gap-3 rounded-lg border border-gray-200/90 bg-white p-3.5 text-left transition-all duration-200 hover:border-sky-300 hover:shadow-md"
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${card.iconBoxClass} transition-transform group-hover:scale-105`}
            >
              {card.icon}
            </span>

            <div className="min-w-0 flex-1 space-y-1">
              <h4 className="text-xs font-bold text-primary transition-colors group-hover:text-btnPrimary sm:text-sm">
                {card.title}
              </h4>
              <p className="text-[11px] leading-relaxed text-primary/55">
                {card.description}
              </p>
            </div>

            <span className="shrink-0 self-end text-primary/60 transition-transform group-hover:translate-x-1 group-hover:text-btnPrimary">
              <ArrowRight size={16} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
