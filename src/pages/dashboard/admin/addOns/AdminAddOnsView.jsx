import { useState, useMemo } from "react";
import { Zap } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";
import {
  AddOnsHeader,
  AddOnsTabs,
  InternationalCallsView,
  PremiumServicesView,
  CreateAddonView,
  ADDONS_DATA,
  INTERNATIONAL_CALLS_DATA,
  PREMIUM_SERVICES_DATA,
  ADDON_ACTIONS,
} from "./sections";

const AdminAddOnsView = () => {
  const [addonsList, setAddonsList] = useState(ADDONS_DATA);
  const [internationalCallsList, setInternationalCallsList] = useState(
    INTERNATIONAL_CALLS_DATA,
  );
  const [premiumServicesList, setPremiumServicesList] = useState(
    PREMIUM_SERVICES_DATA,
  );
  const [activeTab, setActiveTab] = useState("Data Booster");
  const [isCreatePage, setIsCreatePage] = useState(false);
  const [editingAddon, setEditingAddon] = useState(null);

  // Filter regular addons by active category tab
  const filteredAddons = useMemo(() => {
    return addonsList.filter((a) => a.category === activeTab);
  }, [addonsList, activeTab]);

  // Table Columns Definition matching the image for comparison tables
  const columns = useMemo(
    () => [
      {
        key: "dataAmount",
        label: "DATA AMOUNT",
        render: (row) => (
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">{row.dataAmount}</span>
            {row.isPopular && (
              <span className="rounded-md border border-[#b2ebf2] bg-[#e0f7fa] px-2 py-0.5 text-[10px] font-bold text-[#0097a7]">
                POPULAR
              </span>
            )}
          </div>
        ),
      },
      {
        key: "price",
        label: "PRICE",
        render: (row) => (
          <span className="font-semibold text-sky-500">{row.price}</span>
        ),
      },
      {
        key: "validity",
        label: "VALIDITY",
        render: (row) => (
          <span className="font-medium text-slate-800">{row.validity}</span>
        ),
      },
      {
        key: "speed",
        label: "SPEED",
        render: (row) => <span className="text-slate-500">{row.speed}</span>,
      },
      {
        key: "action",
        label: "ACTION",
        align: "center",
      },
    ],
    [],
  );

  // Action Menu Click Handler for DataTable
  const handleActionClick = (actionName, row) => {
    const act = String(actionName).toLowerCase();
    if (act.includes("edit")) {
      setEditingAddon(row);
      setIsCreatePage(true);
    } else if (act.includes("delete")) {
      if (
        window.confirm(
          `Are you sure you want to delete "${row.dataAmount}" from ${row.category}?`,
        )
      ) {
        setAddonsList((prev) => prev.filter((a) => a.id !== row.id));
      }
    } else {
      console.log("View add-on details:", row);
    }
  };

  // International Call Edit Handler
  const handleEditInternationalCall = (callItem) => {
    setEditingAddon({
      id: callItem.id,
      category: "International Calls",
      dataAmount: callItem.minutes,
      price: callItem.price,
      validity: callItem.validity,
      speed: "HD Voice",
      tag: callItem.tag,
      countries: callItem.countries,
      tagline: callItem.tagline,
      isPopular: callItem.isPopular,
    });
    setIsCreatePage(true);
  };

  // International Call Delete Handler
  const handleDeleteInternationalCall = (callItem) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${callItem.minutes}" (${callItem.tag})?`,
      )
    ) {
      setInternationalCallsList((prev) =>
        prev.filter((c) => c.id !== callItem.id),
      );
    }
  };

  // Premium Service Edit Handler
  const handleEditPremiumService = (service) => {
    setEditingAddon({
      id: service.id,
      category: "Premium Services",
      dataAmount: service.title,
      price: service.price,
      serviceType: service.icon,
      description: service.description,
      isPopular: false,
    });
    setIsCreatePage(true);
  };

  // Premium Service Delete Handler
  const handleDeletePremiumService = (service) => {
    if (window.confirm(`Are you sure you want to delete "${service.title}"?`)) {
      setPremiumServicesList((prev) => prev.filter((s) => s.id !== service.id));
    }
  };

  // Open Create Add-on page based on current active tab
  const handleOpenCreate = () => {
    setEditingAddon(null);
    setIsCreatePage(true);
  };

  // Save (Create or Update) Add-on
  const handleSaveAddon = (savedAddon) => {
    if (savedAddon.category === "International Calls") {
      setInternationalCallsList((prev) => {
        const exists = prev.some((c) => c.id === savedAddon.id);
        if (exists) {
          return prev.map((c) =>
            c.id === savedAddon.id ? { ...c, ...savedAddon } : c,
          );
        }
        return [savedAddon, ...prev];
      });
    } else if (savedAddon.category === "Premium Services") {
      setPremiumServicesList((prev) => {
        const exists = prev.some((s) => s.id === savedAddon.id);
        if (exists) {
          return prev.map((s) =>
            s.id === savedAddon.id ? { ...s, ...savedAddon } : s,
          );
        }
        return [savedAddon, ...prev];
      });
    } else {
      setAddonsList((prev) => {
        const exists = prev.some((a) => a.id === savedAddon.id);
        if (exists) {
          return prev.map((a) =>
            a.id === savedAddon.id ? { ...a, ...savedAddon } : a,
          );
        }
        return [savedAddon, ...prev];
      });
    }
    setIsCreatePage(false);
    setEditingAddon(null);
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900 font-sans">
      {/* 1. If in Create / Edit page mode, render CreateAddonView */}
      {isCreatePage ? (
        <CreateAddonView
          category={editingAddon?.category || activeTab}
          addonToEdit={editingAddon}
          onBack={() => {
            setIsCreatePage(false);
            setEditingAddon(null);
          }}
          onSave={handleSaveAddon}
        />
      ) : (
        /* 2. Main Add-ons Management Dashboard View */
        <>
          {/* Header with Create Button */}
          <AddOnsHeader onCreateAddon={handleOpenCreate} />

          {/* Category Filter Tabs */}
          <AddOnsTabs activeTab={activeTab} onSelectTab={setActiveTab} />

          {/* Tab Content */}
          {activeTab === "Premium Services" ? (
            /* Managed Services Card Grid */
            <PremiumServicesView
              servicesData={premiumServicesList}
              onEdit={handleEditPremiumService}
              onDelete={handleDeletePremiumService}
            />
          ) : activeTab === "International Calls" ? (
            /* Separate International Calls Cards */
            <InternationalCallsView
              callsData={internationalCallsList}
              onEdit={handleEditInternationalCall}
              onDelete={handleDeleteInternationalCall}
            />
          ) : (
            /* Quick Comparison Table for Data Booster & Roaming Package */
            <div className="space-y-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-2 pb-2">
                <Zap className="h-4 w-4 text-sky-500" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Quick Comparison Table
                </h2>
              </div>

              {/* Common DataTable Component */}
              <DataTable
                columns={columns}
                data={filteredAddons}
                actions={ADDON_ACTIONS}
                onActionClick={handleActionClick}
                pageSize={10}
                emptyMessage={`No add-ons found in "${activeTab}".`}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminAddOnsView;
