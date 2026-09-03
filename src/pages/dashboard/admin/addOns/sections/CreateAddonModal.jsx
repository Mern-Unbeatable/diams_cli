import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ADDON_TABS } from "./addOnsData";

const CreateAddonModal = ({ isOpen, onClose, addonToEdit, onSave }) => {
  const [formData, setFormData] = useState({
    category: "Data Booster",
    dataAmount: "",
    isPopular: false,
    price: "",
    validity: "30 Days",
    speed: "5G High-Speed",
  });

  useEffect(() => {
    if (addonToEdit) {
      setFormData({
        category: addonToEdit.category || "Data Booster",
        dataAmount: addonToEdit.dataAmount || "",
        isPopular: Boolean(addonToEdit.isPopular),
        price: addonToEdit.price || "",
        validity: addonToEdit.validity || "30 Days",
        speed: addonToEdit.speed || "5G High-Speed",
      });
    } else {
      setFormData({
        category: "Data Booster",
        dataAmount: "",
        isPopular: false,
        price: "CHF ",
        validity: "30 Days",
        speed: "5G High-Speed",
      });
    }
  }, [addonToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedAddon = {
      id: addonToEdit?.id || `addon-${Date.now()}`,
      category: formData.category,
      dataAmount: formData.dataAmount || "+5 GB",
      isPopular: formData.isPopular,
      price: formData.price.startsWith("CHF")
        ? formData.price
        : `CHF ${formData.price}`,
      validity: formData.validity || "30 Days",
      speed: formData.speed || "5G High-Speed",
    };

    onSave(savedAddon);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all sm:p-7 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              {addonToEdit ? "Edit Add-on" : "Create New Add-on"}
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Configure data boosters, international calls or roaming extras.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-100 p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
              >
                {ADDON_TABS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Data Amount / Name
              </label>
              <input
                type="text"
                required
                value={formData.dataAmount}
                onChange={(e) =>
                  setFormData({ ...formData, dataAmount: e.target.value })
                }
                placeholder="e.g. +10 GB"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Price
              </label>
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="CHF 9.00"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Validity
              </label>
              <input
                type="text"
                value={formData.validity}
                onChange={(e) =>
                  setFormData({ ...formData, validity: e.target.value })
                }
                placeholder="30 Days"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Speed
            </label>
            <input
              type="text"
              value={formData.speed}
              onChange={(e) =>
                setFormData({ ...formData, speed: e.target.value })
              }
              placeholder="5G Ultra Speed"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isPopular"
              checked={formData.isPopular}
              onChange={(e) =>
                setFormData({ ...formData, isPopular: e.target.checked })
              }
              className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <label
              htmlFor="isPopular"
              className="text-xs font-semibold text-slate-700 sm:text-sm"
            >
              Mark as Popular badge
            </label>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 sm:text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#38bdf8] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-500 active:scale-95 sm:text-sm"
            >
              {addonToEdit ? "Update Add-on" : "Create Add-on"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAddonModal;
