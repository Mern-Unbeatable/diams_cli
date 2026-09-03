import { useState, useEffect } from "react";
import { ArrowLeft, Info, Plus, Trash2 } from "lucide-react";

const CreatePlanView = ({ planToEdit, onBack, onSubmitPlan }) => {
  // Basic Info State
  const [basicInfo, setBasicInfo] = useState({
    planName: "",
    monthlyPrice: "",
    title: "",
    subTitle: "",
    featured: "",
    mostPopular: true,
  });

  // What's Included State
  const [whatsIncluded, setWhatsIncluded] = useState([
    { title: "", body: "" },
    { title: "", body: "" },
    { title: "", body: "" },
  ]);

  // Good to Know State
  const [goodToKnow, setGoodToKnow] = useState([
    { title: "", body: "" },
    { title: "", body: "" },
    { title: "", body: "" },
  ]);

  // FAQs State
  const [faqs, setFaqs] = useState([
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
  ]);

  // Populate data when editing an existing plan
  useEffect(() => {
    if (planToEdit) {
      setBasicInfo({
        planName: planToEdit.name || "",
        monthlyPrice: planToEdit.price ? `CHF ${planToEdit.price}` : "",
        title: `${planToEdit.brand || "NovaSky"} ${planToEdit.name || ""}`,
        subTitle: planToEdit.tagline || "",
        featured: planToEdit.tagline || "",
        mostPopular: Boolean(planToEdit.isFeatured),
      });

      if (planToEdit.features && planToEdit.features.length > 0) {
        setWhatsIncluded(
          planToEdit.features.map((f) => ({
            title: f.text || "",
            body: "Included with high-speed priority",
          })),
        );
      }
    }
  }, [planToEdit]);

  // Dynamic row additions
  const handleAddWhatsIncluded = () => {
    setWhatsIncluded((prev) => [...prev, { title: "", body: "" }]);
  };

  const handleRemoveWhatsIncluded = (index) => {
    setWhatsIncluded((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddGoodToKnow = () => {
    setGoodToKnow((prev) => [...prev, { title: "", body: "" }]);
  };

  const handleRemoveGoodToKnow = (index) => {
    setGoodToKnow((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddFaq = () => {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  };

  const handleRemoveFaq = (index) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedPrice = basicInfo.monthlyPrice
      ? basicInfo.monthlyPrice.replace(/[^0-9.]/g, "")
      : "29.90";

    const features = whatsIncluded
      .filter((item) => item.title.trim() || item.body.trim())
      .map((item, idx) => ({
        id: `f-${idx}`,
        icon: "check",
        text: item.title || item.body,
      }));

    const savedPlan = {
      id: planToEdit?.id || `plan-${Date.now()}`,
      brand: "NovaSky",
      name: basicInfo.planName || basicInfo.title || "Custom",
      tagline: basicInfo.subTitle || "Tailored mobile plan",
      currency: "CHF",
      price: formattedPrice || "29.90",
      period: "/month",
      isFeatured: basicInfo.mostPopular,
      features:
        features.length > 0
          ? features
          : [
              { id: "f1", icon: "radio", text: "50 GB in 5G Switzerland" },
              {
                id: "f2",
                icon: "phone",
                text: "Unlimited Calls within Switzerland",
              },
              {
                id: "f3",
                icon: "message",
                text: "Unlimited SMS within Switzerland",
              },
              { id: "f4", icon: "wifi", text: "Hotspot included" },
              { id: "f5", icon: "check", text: "No commitment" },
            ],
    };

    if (onSubmitPlan) {
      onSubmitPlan(savedPlan);
    }
    if (onBack) {
      onBack();
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
        <span>Back to Plans</span>
      </button>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
          {planToEdit ? "Edit Plan" : "Create New Plan"}
        </h1>
        <p className="mt-1 text-xs text-slate-400 sm:text-sm">
          Configure product details, pricing, and visibility settings.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* CARD 1: Basic Info */}
        <div className="space-y-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center gap-2 text-slate-800">
            <Info className="h-4 w-4 text-sky-500" />
            <h2 className="text-sm font-bold text-slate-900">Basic Info</h2>
          </div>

          {/* Row 1: Plan Name & Monthly Price */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Plan Name
              </label>
              <input
                type="text"
                value={basicInfo.planName}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, planName: e.target.value })
                }
                placeholder="e.g. Nova Infinity"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Monthly Price
              </label>
              <input
                type="text"
                value={basicInfo.monthlyPrice}
                onChange={(e) =>
                  setBasicInfo({ ...basicInfo, monthlyPrice: e.target.value })
                }
                placeholder="CHF 30.00"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Row 2: Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Tittle
            </label>
            <input
              type="text"
              value={basicInfo.title}
              onChange={(e) =>
                setBasicInfo({ ...basicInfo, title: e.target.value })
              }
              placeholder="Write tittle"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
            />
          </div>

          {/* Row 3: Sub title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Sub tittle
            </label>
            <input
              type="text"
              value={basicInfo.subTitle}
              onChange={(e) =>
                setBasicInfo({ ...basicInfo, subTitle: e.target.value })
              }
              placeholder="Write sub tittle"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
            />
          </div>

          {/* Row 4: Featured */}
          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Featured
            </label>
            <textarea
              rows={4}
              value={basicInfo.featured}
              onChange={(e) =>
                setBasicInfo({ ...basicInfo, featured: e.target.value })
              }
              placeholder="Write featured"
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
            />
          </div>

          {/* Row 5: Most Popular Toggle Bar */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#f8fafc] p-3.5">
            <span className="text-xs font-semibold text-slate-700 sm:text-sm">
              Most Popular
            </span>
            <button
              type="button"
              onClick={() =>
                setBasicInfo({
                  ...basicInfo,
                  mostPopular: !basicInfo.mostPopular,
                })
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                basicInfo.mostPopular ? "bg-sky-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  basicInfo.mostPopular ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* CARD 2: What's Included */}
        <div className="space-y-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center gap-2 text-slate-800">
            <Info className="h-4 w-4 text-sky-500" />
            <h2 className="text-sm font-bold text-slate-900">
              What&apos;s Included
            </h2>
          </div>

          {whatsIncluded.map((item, idx) => (
            <div
              key={idx}
              className="relative grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Tittle {idx + 1}
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const newArr = [...whatsIncluded];
                    newArr[idx].title = e.target.value;
                    setWhatsIncluded(newArr);
                  }}
                  placeholder="80 GB in 5G"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-700">
                    Body {idx + 1}
                  </label>
                  {whatsIncluded.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveWhatsIncluded(idx)}
                      className="text-slate-400 transition hover:text-rose-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={item.body}
                  onChange={(e) => {
                    const newArr = [...whatsIncluded];
                    newArr[idx].body = e.target.value;
                    setWhatsIncluded(newArr);
                  }}
                  placeholder="High Speed data in swetzerland"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
          ))}

          {/* Add Another Field Bar with Plus Button */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#f8fafc] p-3.5">
            <span className="text-xs font-semibold text-slate-700 sm:text-sm">
              Add Another feild
            </span>
            <button
              type="button"
              onClick={handleAddWhatsIncluded}
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500 text-white shadow-sm transition hover:bg-sky-600 active:scale-95"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* CARD 3: Good to Know */}
        <div className="space-y-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center gap-2 text-slate-800">
            <Info className="h-4 w-4 text-sky-500" />
            <h2 className="text-sm font-bold text-slate-900">Good to Know</h2>
          </div>

          {goodToKnow.map((item, idx) => (
            <div
              key={idx}
              className="relative grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Tittle {idx + 1}
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const newArr = [...goodToKnow];
                    newArr[idx].title = e.target.value;
                    setGoodToKnow(newArr);
                  }}
                  placeholder="80 GB in 5G"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-700">
                    Body {idx + 1}
                  </label>
                  {goodToKnow.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveGoodToKnow(idx)}
                      className="text-slate-400 transition hover:text-rose-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={item.body}
                  onChange={(e) => {
                    const newArr = [...goodToKnow];
                    newArr[idx].body = e.target.value;
                    setGoodToKnow(newArr);
                  }}
                  placeholder="High Speed data in swetzerland"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
          ))}

          {/* Add Another Field Bar with Plus Button */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#f8fafc] p-3.5">
            <span className="text-xs font-semibold text-slate-700 sm:text-sm">
              Add Another feild
            </span>
            <button
              type="button"
              onClick={handleAddGoodToKnow}
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500 text-white shadow-sm transition hover:bg-sky-600 active:scale-95"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* CARD 4: Frequently ASK A Question */}
        <div className="space-y-4 rounded-xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center gap-2 text-slate-800">
            <Info className="h-4 w-4 text-sky-500" />
            <h2 className="text-sm font-bold text-slate-900">
              Frequently ASK A Question
            </h2>
          </div>

          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="relative grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Question {idx + 1}
                </label>
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => {
                    const newArr = [...faqs];
                    newArr[idx].question = e.target.value;
                    setFaqs(newArr);
                  }}
                  placeholder="80 GB in 5G"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-700">
                    Answer {idx + 1}
                  </label>
                  {faqs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFaq(idx)}
                      className="text-slate-400 transition hover:text-rose-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={item.answer}
                  onChange={(e) => {
                    const newArr = [...faqs];
                    newArr[idx].answer = e.target.value;
                    setFaqs(newArr);
                  }}
                  placeholder="High Speed data in swetzerland"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
          ))}

          {/* Add Another Field Bar with Plus Button */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#f8fafc] p-3.5">
            <span className="text-xs font-semibold text-slate-700 sm:text-sm">
              Add Another feild
            </span>
            <button
              type="button"
              onClick={handleAddFaq}
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500 text-white shadow-sm transition hover:bg-sky-600 active:scale-95"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="rounded-xl bg-[#38bdf8] px-8 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-sky-500 active:scale-95 sm:text-sm"
          >
            {planToEdit ? "Update Plan" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlanView;
