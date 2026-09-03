import { useState, useEffect } from "react";
import { ArrowLeft, Info } from "lucide-react";

const CreateAddonView = ({
  category = "Data Booster",
  addonToEdit,
  onBack,
  onSave,
}) => {
  // Form States
  const [formData, setFormData] = useState({
    // Common, Roaming, Booster, Premium
    dataAmount: "",
    name: "",
    price: "",
    validity: "",
    speed: "",
    description: "",

    // International Calls specific fields
    title: "",
    subtitle: "",
    included: "",
    featured: "",

    // General
    isPopular: false,
  });

  useEffect(() => {
    if (addonToEdit) {
      setFormData({
        dataAmount:
          addonToEdit.dataAmount ||
          addonToEdit.minutes ||
          addonToEdit.title ||
          "",
        name:
          addonToEdit.name ||
          addonToEdit.title ||
          addonToEdit.dataAmount ||
          addonToEdit.tag ||
          "",
        price: addonToEdit.price || "",
        validity: addonToEdit.validity || "",
        speed: addonToEdit.speed || "",
        description: addonToEdit.description || addonToEdit.speed || "",
        title: addonToEdit.minutes || addonToEdit.title || "",
        subtitle: addonToEdit.subtitle || addonToEdit.speed || "",
        included: Array.isArray(addonToEdit.countries)
          ? addonToEdit.countries.join(",")
          : addonToEdit.included || "",
        featured: addonToEdit.tagline || addonToEdit.featured || "",
        isPopular: Boolean(addonToEdit.isPopular),
      });
    } else {
      setFormData({
        dataAmount: "",
        name: "",
        price: "",
        validity: "",
        speed: "",
        description: "",
        title: "",
        subtitle: "",
        included: "",
        featured: "",
        isPopular: false,
      });
    }
  }, [addonToEdit, category]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let savedItem = null;

    if (category === "International Calls") {
      const countriesList = formData.included
        ? formData.included
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean)
        : ["Bangladesh", "India", "Pakistan"];

      savedItem = {
        id: addonToEdit?.id || `ic-${Date.now()}`,
        tag: formData.name || "BASIC PACK",
        price: formData.price
          ? formData.price.startsWith("CHF")
            ? formData.price
            : `CHF ${formData.price}`
          : "CHF 30.00",
        minutes: formData.title || "Unlimited Selected Countries",
        iconType:
          formData.title && formData.title.toLowerCase().includes("unlimited")
            ? "infinity"
            : "phone",
        tagline:
          formData.featured ||
          formData.subtitle ||
          "Ideal starter package for calling top destinations.",
        validity: formData.validity || "30 Days",
        countries: countriesList,
        moreCountriesCount: 4,
        features: ["100 minutes of HD voice", "Landline & mobile"],
        isPopular: formData.isPopular,
        category: "International Calls",
      };
    } else if (category === "Premium Services") {
      const nameLower = (formData.name || "").toLowerCase();
      let iconType = "sim";
      if (
        nameLower.includes("lock") ||
        nameLower.includes("protect") ||
        nameLower.includes("security")
      ) {
        iconType = "lock";
      } else if (nameLower.includes("voice") || nameLower.includes("mail")) {
        iconType = "voicemail";
      }

      savedItem = {
        id: addonToEdit?.id || `ps-${Date.now()}`,
        title: formData.name || formData.dataAmount || "SIM Replacement",
        price: formData.price
          ? formData.price.startsWith("CHF")
            ? formData.price
            : `CHF ${formData.price}`
          : "CHF 30.00",
        priceType:
          formData.price && formData.price.includes("/mo") ? "purple" : "amber",
        icon: iconType,
        description:
          formData.description ||
          "Active telecommunication service configured for device management and security.",
        category: "Premium Services",
        isPopular: false,
      };
    } else if (category === "Roaming Package") {
      savedItem = {
        id: addonToEdit?.id || `addon-${Date.now()}`,
        category: "Roaming Package",
        dataAmount: formData.name || formData.dataAmount || "+5GB",
        isPopular: formData.isPopular,
        price: formData.price
          ? formData.price.startsWith("CHF")
            ? formData.price
            : `CHF ${formData.price}`
          : "CHF 30.00",
        validity: formData.validity || "30 Days",
        speed: formData.description || formData.speed || "5G- High Speed",
      };
    } else {
      // Data Booster
      savedItem = {
        id: addonToEdit?.id || `addon-${Date.now()}`,
        category: "Data Booster",
        dataAmount: formData.dataAmount || formData.name || "+5GB",
        isPopular: formData.isPopular,
        price: formData.price
          ? formData.price.startsWith("CHF")
            ? formData.price
            : `CHF ${formData.price}`
          : "CHF 30.00",
        validity: formData.validity || "30 Days",
        speed: formData.speed || "5G- High Speed",
      };
    }

    if (onSave) {
      onSave(savedItem);
    }
    if (onBack) {
      onBack();
    }
  };

  // Dynamic Header Title
  const getPageTitle = () => {
    if (addonToEdit) {
      return `Edit ${category}`;
    }
    switch (category) {
      case "Data Booster":
        return "Create New Data Booster";
      case "International Calls":
        return "Create New International Calls";
      case "Roaming Package":
        return "Create New Roaming Package";
      case "Premium Services":
        return "Create New Premium Service";
      default:
        return "Create New Add-on";
    }
  };

  return (
    <div className="space-y-6 pb-12 text-slate-900 font-sans">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 transition-colors hover:text-sky-600"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Add-ons</span>
      </button>

      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
          {getPageTitle()}
        </h1>
        <p className="mt-1 text-xs text-slate-400 sm:text-sm">
          Configure product details, pricing, and visibility settings.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* CARD: Basic Info */}
        <div className="space-y-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center gap-2 text-slate-800">
            <Info className="h-4 w-4 text-sky-500" />
            <h2 className="text-sm font-bold text-slate-900">Basic Info</h2>
          </div>

          {/* DYNAMIC FORM FIELDS BASED ON CATEGORY */}
          {category === "Premium Services" ? (
            /* PREMIUM SERVICES FIELDS (EXACT MATCH TO SCREENSHOT) */
            <>
              {/* Row 1: Name & Price (2 columns) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="+5GB"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Price
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="CHF 30.00"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Row 2: Description (Large Textarea Box) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="5G- High Speed"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </>
          ) : category === "Roaming Package" ? (
            /* ROAMING PACKAGE FIELDS */
            <>
              {/* Row 1: Name, Price, Validity (3 columns) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="+5GB"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Price
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="CHF 30.00"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
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
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Row 2: Description (Full Width) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="5G- High Speed"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>

              {/* Most Popular Toggle Bar */}
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#f8fafc] p-3.5">
                <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                  Most Popular
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, isPopular: !formData.isPopular })
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    formData.isPopular ? "bg-sky-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      formData.isPopular ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </>
          ) : category === "International Calls" ? (
            /* INTERNATIONAL CALLS FIELDS */
            <>
              {/* Row 1: Name, Tittle, Price (3 columns) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Basic Pack"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Tittle
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Unlimited Selected Countries"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Price
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="CHF 30.00"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Row 2: Subtitle / Subtittle */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Subtittle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  placeholder="5G- High Speed"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>

              {/* Row 3: Validity & Included (2 columns) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Included
                  </label>
                  <input
                    type="text"
                    value={formData.included}
                    onChange={(e) =>
                      setFormData({ ...formData, included: e.target.value })
                    }
                    placeholder="Bangladesh,India,Pakistan"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Row 4: Featured */}
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Featured
                </label>
                <input
                  type="text"
                  value={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.value })
                  }
                  placeholder="5G- High Speed"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>

              {/* Most Popular Toggle Bar */}
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#f8fafc] p-3.5">
                <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                  Most Popular
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, isPopular: !formData.isPopular })
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    formData.isPopular ? "bg-sky-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      formData.isPopular ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </>
          ) : (
            /* DATA BOOSTER FIELDS */
            <>
              {/* Row 1: Data Amount, Price, Validity */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Data Amount
                  </label>
                  <input
                    type="text"
                    value={formData.dataAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, dataAmount: e.target.value })
                    }
                    placeholder="+5GB"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Price
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="CHF 30.00"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
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
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Row 2: Speed */}
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
                  placeholder="5G- High Speed"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>

              {/* Most Popular Toggle Bar */}
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#f8fafc] p-3.5">
                <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                  Most Popular
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, isPopular: !formData.isPopular })
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    formData.isPopular ? "bg-sky-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      formData.isPopular ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="rounded-xl bg-[#38bdf8] px-8 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-sky-500 active:scale-95 sm:text-sm"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAddonView;
