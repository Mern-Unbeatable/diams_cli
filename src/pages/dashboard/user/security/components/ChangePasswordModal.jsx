import { Check, Eye, EyeOff, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { changePasswordSchema, zodResolver } from "@/lib/formSchemas";
import { FieldError } from "@/Components/form/FieldError";

export const ChangePasswordModal = ({ isOpen, onClose, onSave }) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "password123",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const newPassword = watch("newPassword") || "";

  const rules = {
    length: newPassword.length >= 8,
    lowercase: /[a-z]/.test(newPassword),
    uppercase: /[A-Z]/.test(newPassword),
    number: /\d/.test(newPassword),
    symbol: /[^A-Za-z0-9]/.test(newPassword),
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        currentPassword: "password123",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (values) => {
    onSave?.({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 sm:p-7">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-primary/40 transition-colors hover:bg-gray-100 hover:text-primary"
        >
          <X size={18} />
        </button>

        <div className="space-y-1.5 pr-6">
          <h3 className="text-xl font-bold text-primary sm:text-2xl">
            Change password
          </h3>
          <p className="text-xs text-primary/60 sm:text-sm">
            Choose a strong password you don't use anywhere else.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-primary/80">
              Current password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 pr-10 text-xs text-primary placeholder:text-primary/40 focus:border-[#3b99fc] focus:outline-none focus:ring-2 focus:ring-[#3b99fc]/20 sm:text-sm"
                {...register("currentPassword")}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary"
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <FieldError message={errors.currentPassword?.message} />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-primary/80">
              New password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 pr-10 text-xs text-primary placeholder:text-primary/40 focus:border-[#3b99fc] focus:outline-none focus:ring-2 focus:ring-[#3b99fc]/20 sm:text-sm"
                {...register("newPassword")}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <FieldError message={errors.newPassword?.message} />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-primary/80">
              Confirm new password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 pr-10 text-xs text-primary placeholder:text-primary/40 focus:border-[#3b99fc] focus:outline-none focus:ring-2 focus:ring-[#3b99fc]/20 sm:text-sm"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <FieldError message={errors.confirmPassword?.message} />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 py-1 text-[11px] text-primary/60">
            {[
              { ok: rules.length, label: "At least 8 characters" },
              { ok: rules.uppercase, label: "One uppercase letter" },
              { ok: rules.lowercase, label: "One lowercase letter" },
              { ok: rules.number, label: "One number" },
              { ok: rules.symbol, label: "One symbol (!@#$...)" },
            ].map((rule) => (
              <div
                key={rule.label}
                className={`flex items-center gap-1.5 ${
                  rule.ok
                    ? "font-semibold text-emerald-600"
                    : "text-primary/45"
                }`}
              >
                {rule.ok ? <Check size={13} /> : <span>✕</span>}
                <span>{rule.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-primary/70 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#3b99fc] px-5 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#2b88eb] disabled:opacity-60"
            >
              Update password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
