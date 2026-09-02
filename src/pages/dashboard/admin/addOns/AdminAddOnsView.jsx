import { useState, useMemo } from "react";
import { Zap } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";
import {
  AddOnsHeader,
  AddOnsTabs,
  CreateAddonModal,
  InternationalCallsView,
  PremiumServicesView,
  ADDONS_DATA,
  INTERNATIONAL_CALLS_DATA,
  PREMIUM_SERVICES_DATA,
  ADDON_ACTIONS,
} from "./sections";

const AdminAddOnsView = () => {
  const [addonsList, setAddonsList] = useState(ADDONS_DATA);
  const [internationalCallsList, setInternationalCallsList] = useState(
    INTERNATIONAL_CALLS_DATA
  );
  const [premiumServicesList, setPremiumServicesList] = useState(
    PREMIUM_SERVICES_DATA
  );
  const [activeTab, setActiveTab] = useState("Premium Services");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        render: (row) => (
          <span className="text-slate-500">{row.speed}</span>
        ),
      },
      {
        key: "action",
        label: "ACTION",
        align: "center",
      },
    ],
    []
  );

  // Action Menu Click Handler for DataTable
  const handleActionClick = (actionName, row) => {
    const act = String(actionName).toLowerCase();
    if (act.includes("edit")) {
      setEditingAddon(row);
      setIsModalOpen(true);
    } else if (act.includes("delete")) {
      if (
        window.confirm(
          `Are you sure you want to delete "${row.dataAmount}" from ${row.category}?`
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
      isPopular: callItem.isPopular,
    });
    setIsModalOpen(true);
  };

  // International Call Delete Handler
  const handleDeleteInternationalCall = (callItem) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${callItem.minutes}" (${callItem.tag})?`
      )
    ) {
      setInternationalCallsList((prev) =>
        prev.filter((c) => c.id !== callItem.id)
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
      validity: "Monthly",
      speed: "Realtime",
      isPopular: false,
    });
    setIsModalOpen(true);
  };

  // Premium Service Delete Handler
  const handleDeletePremiumService = (service) => {
    if (
      window.confirm(`Are you sure you want to delete "${service.title}"?`)
    ) {
      setPremiumServicesList((prev) =>
        prev.filter((s) => s.id !== service.id)
      );
    }
  };

  // Open Create Add-on modal
  const handleOpenCreate = () => {
    setEditingAddon(null);
    setIsModalOpen(true);
  };

  // Save (Create or Update) Add-on
  const handleSaveAddon = (savedAddon) => {
    if (savedAddon.category === "International Calls") {
      setInternationalCallsList((prev) => {
        const exists = prev.some((c) => c.id === savedAddon.id);
        if (exists) {
          return prev.map((c) =>
            c.id === savedAddon.id
              ? {
                  ...c,
                  minutes: savedAddon.dataAmount,
                  price: savedAddon.price,
                  validity: savedAddon.validity,
                  isPopular: savedAddon.isPopular,
                }
              : c
          );
        }
        return [
          {
            id: savedAddon.id,
            tag: "CUSTOM PACK",
            price: savedAddon.price,
            minutes: savedAddon.dataAmount,
            iconType: "phone",
            tagline: "Custom international calling package.",
            validity: savedAddon.validity || "30 days",
            countries: ["Bangladesh", "India", "Pakistan"],
            moreCountriesCount: 4,
            features: ["HD voice calling", "Landline & mobile"],
            isPopular: savedAddon.isPopular,
          },
          ...prev,
        ];
      });
    } else if (savedAddon.category === "Premium Services") {
      setPremiumServicesList((prev) => {
        const exists = prev.some((s) => s.id === savedAddon.id);
        if (exists) {
          return prev.map((s) =>
            s.id === savedAddon.id
              ? {
                  ...s,
                  title: savedAddon.dataAmount,
                  price: savedAddon.price,
                }
              : s
          );
        }
        return [
          {
            id: savedAddon.id,
            title: savedAddon.dataAmount,
            price: savedAddon.price,
            priceType: "purple",
            icon: "sim",
            description:
              "Active telecommunication service configured for device management and security.",
          },
          ...prev,
        ];
      });
    } else {
      setAddonsList((prev) => {
        const exists = prev.some((a) => a.id === savedAddon.id);
        if (exists) {
          return prev.map((a) => (a.id === savedAddon.id ? savedAddon : a));
        }
        return [savedAddon, ...prev];
      });
    }
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900 font-sans">
      {/* 1. Header with Create Button */}
      <AddOnsHeader onCreateAddon={handleOpenCreate} />

      {/* 2. Category Filter Tabs */}
      <AddOnsTabs activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* 3. Main Body */}
      {activeTab === "Premium Services" ? (
        /* Managed Services Card Grid Component */
        <PremiumServicesView
          servicesData={premiumServicesList}
          onEdit={handleEditPremiumService}
          onDelete={handleDeletePremiumService}
        />
      ) : activeTab === "International Calls" ? (
        /* Separate International Calls Cards Component */
        <InternationalCallsView
          callsData={internationalCallsList}
          onEdit={handleEditInternationalCall}
          onDelete={handleDeleteInternationalCall}
        />
      ) : (
        /* Comparison Table for Data Booster and Roaming Package */
        <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          {/* Table Title Bar */}
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

      {/* Create / Edit Add-on Modal */}
      <CreateAddonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addonToEdit={editingAddon}
        onSave={handleSaveAddon}
      />
    </div>
  );
};

export default AdminAddOnsView;
