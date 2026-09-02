import { ADDON_TABS } from "./addOnsData";

const AddOnsTabs = ({ activeTab, onSelectTab }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {ADDON_TABS.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onSelectTab(tab)}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all sm:text-sm ${
              isActive
                ? "bg-[#38bdf8] text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-100"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default AddOnsTabs;
