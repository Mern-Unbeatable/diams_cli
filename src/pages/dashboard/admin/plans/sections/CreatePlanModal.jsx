import { useState, useEffect } from "react";
import { X } from "lucide-react";

const CreatePlanModal = ({ isOpen, onClose, planToEdit, onSave }) => {
  const [formData, setFormData] = useState({
    brand: "NovaSky",
    name: "",
    tagline: "",
    currency: "CHF",
    price: "",
    period: "/month",
    featuresText: "",
  });

  useEffect(() => {
    if (planToEdit) {
      setFormData({
        brand: planToEdit.brand || "NovaSky",
        name: planToEdit.name || "",
        tagline: planToEdit.tagline || "",
        currency: planToEdit.currency || "CHF",
        price: planToEdit.price || "",
        period: planToEdit.period || "/month",
        featuresText: planToEdit.features?.map((f) => f.text).join("\n") || "",
      });
    } else {
      setFormData({
        brand: "NovaSky",
        name: "",
        tagline: "",
        currency: "CHF",
        price: "",
        period: "/month",
        featuresText: "25 GB in 5G Switzerland\nUnlimited Calls within Switzerland\nUnlimited SMS within Switzerland\nHotspot included\nNo commitment",
      });
    }
  }, [planToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const features = formData.featuresText
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean)
      .map((text, i) => {
        let icon = "check";
        const lower = text.toLowerCase();
        if (lower.includes("gb") || lower.includes("5g") || lower.includes("data")) icon = "radio";
        else if (lower.includes("call") || lower.includes("phone")) icon = "phone";
        else if (lower.includes("sms") || lower.includes("message")) icon = "message";
        else if (lower.includes("hotspot") || lower.includes("wifi")) icon = "wifi";
        else if (lower.includes("roam") || lower.includes("eu") || lower.includes("world")) icon = "globe";
        else if (lower.includes("priority") || lower.includes("shield")) icon = "shield";
        return { id: `f-${i}`, icon, text };
      });

    const newPlan = {
      id: planToEdit?.id || `plan-${Date.now()}`,
      brand: formData.brand,
      name: formData.name || "Custom",
      tagline: formData.tagline || "Custom tailored plan",
      currency: formData.currency,
      price: formData.price || "29.90",
      period: formData.period,
      features,
    };

    onSave(newPlan);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all sm:p-7 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              {planToEdit ? "Edit Plan" : "Create New Plan"}
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Configure mobile plan details, pricing and features.
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
                Plan Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Ultra, Pro, Prime"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Price (CHF / month)
              </label>
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="e.g. 49.90"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Tagline / Subtitle
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) =>
                setFormData({ ...formData, tagline: e.target.value })
              }
              placeholder="e.g. The perfect balance for your everyday life"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Features (one per line)
            </label>
            <textarea
              rows={5}
              value={formData.featuresText}
              onChange={(e) =>
                setFormData({ ...formData, featuresText: e.target.value })
              }
              placeholder="100 GB 5G Data&#10;Unlimited Calls in Switzerland&#10;Hotspot included"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 sm:text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#38bdf8] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-sky-500 active:scale-95 sm:text-sm"
            >
              {planToEdit ? "Update Plan" : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlanModal;
