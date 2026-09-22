import { useState, useMemo } from "react";
import { Zap } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";
import {
  useAddOns,
  useCreateAddOn,
  useUpdateAddOn,
  useRemoveAddOn,
} from "@/features/dash/admin/addOns";
import { unwrapList } from "@/lib/query/unwrap";
import { useMutationFeedback } from "@/hooks/useMutationFeedback";
import {
  AddOnsHeader,
  AddOnsTabs,
  InternationalCallsView,
  PremiumServicesView,
  CreateAddonView,
  ADDON_ACTIONS,
} from "./sections";

const AdminAddOnsView = () => {
  const [activeTab, setActiveTab] = useState("Data Booster");
  const [isCreatePage, setIsCreatePage] = useState(false);
  const [editingAddon, setEditingAddon] = useState(null);

  const addOnsQuery = useAddOns({});
  const createAddOn = useCreateAddOn();
  const updateAddOn = useUpdateAddOn();
  const removeAddOn = useRemoveAddOn();

  useMutationFeedback(createAddOn, {
    successMessage: "Add-on created.",
    errorTitle: "Create failed",
  });
  useMutationFeedback(updateAddOn, {
    successMessage: "Add-on updated.",
    errorTitle: "Update failed",
  });
  useMutationFeedback(removeAddOn, {
    successMessage: "Add-on deleted.",
    errorTitle: "Delete failed",
  });

  const allAddOns = useMemo(
    () => unwrapList(addOnsQuery.data),
    [addOnsQuery.data],
  );

  const filteredAddons = useMemo(
    () => allAddOns.filter((a) => a.category === activeTab),
    [allAddOns, activeTab],
  );

  const internationalCallsList = useMemo(
    () =>
      allAddOns.filter((a) => a.category === "International Calls"),
    [allAddOns],
  );

  const premiumServicesList = useMemo(
    () => allAddOns.filter((a) => a.category === "Premium Services"),
    [allAddOns],
  );

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

  const isMutating =
    createAddOn.isPending || updateAddOn.isPending || removeAddOn.isPending;

  const handleActionClick = (actionName, row) => {
    const act = String(actionName).toLowerCase();
    if (act.includes("edit")) {
      setEditingAddon(row);
      setIsCreatePage(true);
    } else if (act.includes("delete")) {
      if (
        window.confirm(
          `Are you sure you want to delete "${row.dataAmount}" from ${row.category}?`,
        ) &&
        !removeAddOn.isPending
      ) {
        removeAddOn.mutate(row.id);
      }
    }
  };

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

  const handleDeleteInternationalCall = (callItem) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${callItem.minutes}" (${callItem.tag})?`,
      ) &&
      !removeAddOn.isPending
    ) {
      removeAddOn.mutate(callItem.id);
    }
  };

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

  const handleDeletePremiumService = (service) => {
    if (
      window.confirm(`Are you sure you want to delete "${service.title}"?`) &&
      !removeAddOn.isPending
    ) {
      removeAddOn.mutate(service.id);
    }
  };

  const handleOpenCreate = () => {
    setEditingAddon(null);
    setIsCreatePage(true);
  };

  const handleSaveAddon = (savedAddon) => {
    if (isMutating) return;
    const exists = allAddOns.some((a) => a.id === savedAddon.id);
    if (exists) {
      const { id, ...payload } = savedAddon;
      updateAddOn.mutate({ id, payload });
    } else {
      createAddOn.mutate(savedAddon);
    }
    setIsCreatePage(false);
    setEditingAddon(null);
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900 font-sans">
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
        <>
          <AddOnsHeader onCreateAddon={handleOpenCreate} />

          <AddOnsTabs activeTab={activeTab} onSelectTab={setActiveTab} />

          {activeTab === "Premium Services" ? (
            <PremiumServicesView
              servicesData={premiumServicesList}
              onEdit={handleEditPremiumService}
              onDelete={handleDeletePremiumService}
            />
          ) : activeTab === "International Calls" ? (
            <InternationalCallsView
              callsData={internationalCallsList}
              onEdit={handleEditInternationalCall}
              onDelete={handleDeleteInternationalCall}
            />
          ) : (
            <div className="space-y-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-2 pb-2">
                <Zap className="h-4 w-4 text-sky-500" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Quick Comparison Table
                </h2>
              </div>

              <DataTable
                columns={columns}
                data={filteredAddons}
                actions={ADDON_ACTIONS}
                onActionClick={handleActionClick}
                pageSize={10}
                emptyMessage={`No add-ons found in "${activeTab}".`}
                isLoading={addOnsQuery.isLoading}
                isFetching={addOnsQuery.isFetching && !addOnsQuery.isLoading}
                error={addOnsQuery.isError ? addOnsQuery.error : null}
                onRetry={() => addOnsQuery.refetch()}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminAddOnsView;
