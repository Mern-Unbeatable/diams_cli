import { useState } from "react";

const EmailTemplatesCard = ({ initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(initialData);

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Email Templates
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

      {/* Form Fields */}
      <div className="mt-6 space-y-5">
        {/* Row 1: Template list & Subject */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Template list
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={data.templateList}
              onChange={(e) =>
                setData({ ...data, templateList: e.target.value })
              }
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm sm:text-base font-medium transition outline-none ${
                isEditing
                  ? "border-sky-400 bg-white text-slate-900 ring-1 ring-sky-400"
                  : "border-slate-100 bg-[#f8fbfe] text-slate-800"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Subject
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={data.subject}
              onChange={(e) => setData({ ...data, subject: e.target.value })}
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm sm:text-base font-medium transition outline-none ${
                isEditing
                  ? "border-sky-400 bg-white text-slate-900 ring-1 ring-sky-400"
                  : "border-slate-100 bg-[#f8fbfe] text-slate-800"
              }`}
            />
          </div>
        </div>

        {/* Row 2: Template body */}
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Template body
          </label>
          <textarea
            rows={3}
            disabled={!isEditing}
            value={data.templateBody}
            onChange={(e) =>
              setData({ ...data, templateBody: e.target.value })
            }
            className={`mt-2 w-full rounded-2xl border p-4 text-sm sm:text-base font-medium transition outline-none resize-none ${
              isEditing
                ? "border-sky-400 bg-white text-slate-900 ring-1 ring-sky-400"
                : "border-slate-100 bg-[#f8fbfe] text-slate-800"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailTemplatesCard;
