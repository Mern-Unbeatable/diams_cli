import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, Info, AlertTriangle, X, XCircle } from "lucide-react";
import { subscribeToasts } from "@/lib/feedback/toast-bus";

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const STYLES = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  error: "border-rose-200 bg-rose-50 text-rose-900",
  warning: "border-amber-200 bg-amber-50 text-amber-950",
  info: "border-sky-200 bg-sky-50 text-sky-950",
};

const ICON_STYLES = {
  success: "text-emerald-600",
  error: "text-rose-600",
  warning: "text-amber-600",
  info: "text-sky-600",
};

/**
 * Minimal global toast host — mounts once near the app root.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    return subscribeToasts((toast) => {
      setToasts((prev) => [...prev.slice(-4), toast]);
      if (toast.duration > 0) {
        window.setTimeout(() => dismiss(toast.id), toast.duration);
      }
    });
  }, [dismiss]);

  return (
    <>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(100%-2rem,22rem)] flex-col gap-2"
        aria-live="polite"
        aria-relevant="additions"
      >
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] || Info;
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-3.5 py-3 shadow-lg ${STYLES[toast.type] || STYLES.info}`}
              role="status"
            >
              <Icon
                size={18}
                className={`mt-0.5 shrink-0 ${ICON_STYLES[toast.type] || ICON_STYLES.info}`}
              />
              <div className="min-w-0 flex-1">
                {toast.title ? (
                  <p className="text-sm font-semibold">{toast.title}</p>
                ) : null}
                <p className={`text-sm ${toast.title ? "mt-0.5 opacity-90" : "font-medium"}`}>
                  {toast.message}
                </p>
              </div>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="rounded-md p-1 opacity-60 transition hover:opacity-100"
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ToastProvider;
