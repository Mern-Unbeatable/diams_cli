import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Camera, Check } from "lucide-react";
import { accountSettingsSchema, zodResolver } from "@/lib/formSchemas";
import { FieldError } from "@/Components/form/FieldError";

const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 hover:border-slate-300 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/30";

const CollaboratorAccountSettingsCard = () => {
  const [avatarUrl, setAvatarUrl] = useState(
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
  );
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      firstName: "Kevin",
      lastName: "",
      email: "customer@gmail.com",
      phoneNumber: "+1-202-555-0118",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const onSubmit = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-3.5 sm:px-6">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-700">
          Account Setting
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-6 p-5 sm:p-6"
      >
        {isSaved && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-700">
            <Check className="h-3.5 w-3.5" />
            <span>Account details updated successfully!</span>
          </div>
        )}

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="relative mx-auto shrink-0 sm:mx-0">
            <div className="h-[7.5rem] w-[7.5rem] overflow-hidden rounded-full bg-slate-200 ring-1 ring-slate-200">
              <img
                src={avatarUrl}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Change photo"
              aria-label="Change photo"
              className="absolute bottom-0.5 right-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-slate-700 shadow-sm ring-2 ring-white transition-colors hover:bg-[#bfdbfe]"
              style={{ borderRadius: "9999px" }}
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="min-w-0 flex-1 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  First name
                </label>
                <input
                  type="text"
                  className={inputClass}
                  {...register("firstName")}
                />
                <FieldError message={errors.firstName?.message} />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Display name"
                  className={inputClass}
                  {...register("lastName")}
                />
                <FieldError message={errors.lastName?.message} />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Email
                </label>
                <input
                  type="email"
                  className={inputClass}
                  {...register("email")}
                />
                <FieldError message={errors.email?.message} />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className={inputClass}
                  {...register("phoneNumber")}
                />
                <FieldError message={errors.phoneNumber?.message} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-[#3b82f6] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#2563eb] disabled:opacity-60"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollaboratorAccountSettingsCard;
