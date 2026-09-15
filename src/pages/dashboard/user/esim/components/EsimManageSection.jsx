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
    <div className="min-w-0 space-y-4">
      <h3 className="text-base sm:text-lg font-bold text-primary">
        Manage your eSIM
      </h3>

      {/* Stack until 2xl — 3-col only when left column is wide enough */}
      <div className="grid min-w-0 gap-3 sm:gap-4 2xl:grid-cols-3">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={card.onClick}
            className="group flex min-w-0 items-start gap-3 rounded-xl border border-gray-200/90 bg-white p-4 text-left shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md sm:gap-4 sm:p-5"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border sm:h-11 sm:w-11 ${card.iconBoxClass} shadow-xs transition-transform group-hover:scale-105`}
            >
              {card.icon}
            </span>

            <div className="min-w-0 flex-1 space-y-1">
              <h4 className="text-sm font-bold text-primary transition-colors group-hover:text-btnPrimary">
                {card.title}
              </h4>
              <p className="text-xs leading-relaxed text-primary/55">
                {card.description}
              </p>
            </div>

            <span className="mt-1 shrink-0 text-btnPrimary transition-transform group-hover:translate-x-1">
              <ArrowRight size={16} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
