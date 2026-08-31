import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

const PlansTabs = ({ activeTab, setActiveTab }) => (
  <div className="border-b border-gray-200">
    <div className="flex gap-6 overflow-x-auto pb-px scrollbar-none">
      {USER_PLANS_OPTIONS.tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            type="button"
            className={`shrink-0 border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${
              isActive
                ? "border-btnPrimary text-btnPrimary"
                : "border-transparent text-primary/60 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  </div>
);

export default PlansTabs;
