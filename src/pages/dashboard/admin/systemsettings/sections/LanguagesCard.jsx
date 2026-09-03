import { useState } from "react";
import { Check } from "lucide-react";

const ALL_LANGUAGES = ["German", "French", "Italian", "English"];

const LanguagesCard = ({ initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLangs, setSelectedLangs] = useState(initialData.selected);
  const [defaultLang, setDefaultLang] = useState(initialData.defaultLanguage);

  const toggleLang = (lang) => {
    if (!isEditing) return;
    setSelectedLangs((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang],
    );
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Languages
          </h2>
          <p className="mt-0.5 text-sm text-slate-400">
            Edit, save or cancel this configuration section.
          </p>
        </div>

        <div>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-xl bg-[#2ea5ff] px-5 py-2 text-sm font-semibold text-white hover:bg-sky-500 transition shadow-sm"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Languages Grid */}
      <div className="mt-6 space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ALL_LANGUAGES.map((lang) => {
            const isChecked = selectedLangs.includes(lang);
            return (
              <div
                key={lang}
                onClick={() => toggleLang(lang)}
                className={`flex items-center gap-3.5 rounded-xl border p-4 transition ${
                  isEditing ? "cursor-pointer" : "cursor-default"
                } ${
                  isChecked
                    ? "border-slate-200 bg-[#f8fbfe]"
                    : "border-slate-100 bg-white"
                }`}
              >
                <div
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded transition ${
                    isChecked
                      ? "bg-[#2ea5ff] border border-[#2ea5ff] text-white"
                      : "border-2 border-slate-300 bg-white"
                  }`}
                >
                  {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <span className="text-sm sm:text-base font-semibold text-slate-800">
                  {lang}
                </span>
              </div>
            );
          })}
        </div>

        {/* Default Language Selector */}
        <div className="max-w-xs pt-1">
          <label className="block text-sm font-semibold text-slate-700">
            Default language
          </label>
          <select
            disabled={!isEditing}
            value={defaultLang}
            onChange={(e) => setDefaultLang(e.target.value)}
            className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm sm:text-base font-medium transition outline-none ${
              isEditing
                ? "border-sky-400 bg-white text-slate-900 ring-1 ring-sky-400 cursor-pointer"
                : "border-slate-100 bg-[#f8fbfe] text-slate-800 cursor-default"
            }`}
          >
            {ALL_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default LanguagesCard;
