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
    <div className="space-y-4">
      <h3 className="text-base sm:text-lg font-bold text-primary">
        Manage your eSIM
      </h3>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={card.onClick}
            className="group relative flex flex-col justify-between rounded-xl border border-gray-200/90 bg-white p-5 text-left shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${card.iconBoxClass} shadow-xs transition-transform group-hover:scale-105`}
              >
                {card.icon}
              </span>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-primary group-hover:text-btnPrimary transition-colors">
                  {card.title}
                </h4>
                <p className="text-[11px] text-primary/55 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <span className="text-btnPrimary transition-transform group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
