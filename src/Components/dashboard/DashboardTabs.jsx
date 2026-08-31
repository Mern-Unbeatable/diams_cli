const DashboardTabs = ({ tabs = [], activeTab, onChange }) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex gap-6 overflow-x-auto pb-px scrollbar-none">
        {tabs.map((tab) => {
          const tabId = typeof tab === "string" ? tab : tab.id;
          const tabLabel = typeof tab === "string" ? tab : tab.label;
          const isActive = tabId === activeTab;

          return (
            <button
              key={tabId}
              onClick={() => onChange?.(tabId)}
              type="button"
              className={`shrink-0 border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-btnPrimary text-btnPrimary"
                  : "border-transparent text-primary/60 hover:text-primary"
              }`}
            >
              {tabLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardTabs;
