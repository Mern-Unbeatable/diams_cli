import { Check, Mail, UploadCloud, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { newTicketSchema } from "@/features/dash/user/support/validation";
import { zodResolver } from "@/lib/validation";
import { FieldError } from "@/Components/form/FieldError";

export const NewTicketModal = ({ isOpen, onClose, createTicket }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newTicketSchema),
    defaultValues: {
      topic: "eSIM",
      subject: "",
      description: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        topic: "eSIM",
        subject: "",
        description: "",
      });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const isPending = Boolean(createTicket?.isPending);

  const onSubmit = (values) => {
    if (!createTicket || createTicket.isPending) return;
    createTicket.mutate(
      {
        topic: values.topic,
        subject: values.subject.trim(),
        description: values.description.trim(),
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-btnPrimary">
              <Mail size={18} />
            </span>
            <h3 className="text-base font-bold text-primary">
              Open a Support Ticket
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-primary/40 transition-colors hover:bg-gray-100 hover:text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 space-y-3.5 text-xs"
        >
          <div className="space-y-1">
            <label className="font-bold text-primary">Topic Category</label>
            <select
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 font-semibold text-primary focus:border-btnPrimary focus:outline-none"
              {...register("topic")}
            >
              <option value="eSIM">eSIM & Activation</option>
              <option value="Data">Data & Connectivity</option>
              <option value="Billing">Billing & Payments</option>
              <option value="Account">Account & Profile</option>
              <option value="SIM">SIM & PUK</option>
            </select>
            <FieldError message={errors.topic?.message} />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-primary">Subject</label>
            <input
              type="text"
              placeholder="e.g. Cannot connect to 5G network in Zurich"
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 font-semibold text-primary focus:border-btnPrimary focus:outline-none"
              {...register("subject")}
            />
            <FieldError message={errors.subject?.message} />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-primary">
              Detailed Description
            </label>
            <textarea
              rows={4}
              placeholder="Please describe your issue in detail..."
              className="w-full rounded-xl border border-gray-200 bg-white p-3 font-medium text-primary focus:border-btnPrimary focus:outline-none"
              {...register("description")}
            />
            <FieldError message={errors.description?.message} />
          </div>

          <div className="cursor-pointer rounded-xl border border-dashed border-sky-200 bg-sky-50/40 p-3 text-center transition-colors hover:bg-sky-50">
            <UploadCloud size={18} className="mx-auto text-btnPrimary" />
            <p className="mt-0.5 text-[11px] font-semibold text-primary">
              Attach screenshot or log file (Optional)
            </p>
          </div>

          <div className="flex items-center justify-end gap-2.5 border-t border-gray-100 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2 font-semibold text-primary/70 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded-xl bg-btnPrimary px-5 py-2 font-bold text-white shadow-sm transition-colors hover:bg-btnPrimary/90 disabled:opacity-60"
            >
              <Check size={14} />
              <span>{isPending ? "Submitting…" : "Submit Ticket"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
