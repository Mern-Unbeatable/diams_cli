const DashboardTabs = ({ tabs = [], activeTab, onChange }) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex items-center gap-8 overflow-x-auto pb-px scrollbar-none sm:gap-10">
        {tabs.map((tab) => {
          const tabId = typeof tab === "string" ? tab : tab.id;
          const tabLabel = typeof tab === "string" ? tab : tab.label;
          const isActive = tabId === activeTab;

          return (
            <button
              key={tabId}
              onClick={() => onChange?.(tabId)}
              type="button"
              className={`relative shrink-0 pb-3 text-sm font-semibold transition-colors sm:text-[15px] ${
                isActive
                  ? "font-bold text-[#258bf5]"
                  : "text-[#334155] hover:text-[#0b1736]"
              }`}
            >
              <span>{tabLabel}</span>
              {isActive && (
                <span className="absolute -bottom-[1px] left-0 right-0 h-[2.5px] rounded-full bg-[#258bf5]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardTabs;
