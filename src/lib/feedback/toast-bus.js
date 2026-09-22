/**
 * Tiny pub/sub so Axios interceptors can emit toasts without importing React.
 */

/** @typedef {{ id?: string, type?: "success" | "error" | "info" | "warning", title?: string, message: string, duration?: number }} ToastInput */

/** @type {Set<(toast: Required<ToastInput>) => void>} */
const listeners = new Set();

/**
 * @param {(toast: Required<ToastInput>) => void} listener
 * @returns {() => void}
 */
export function subscribeToasts(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * @param {ToastInput} toast
 */
export function pushToast(toast) {
  if (!toast?.message) return;
  const payload = {
    id: toast.id || `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type: toast.type || "info",
    title: toast.title || "",
    message: toast.message,
    duration: toast.duration ?? (toast.type === "error" ? 6000 : 3500),
  };
  listeners.forEach((listener) => listener(payload));
}

export function toastSuccess(message, title = "Success") {
  pushToast({ type: "success", title, message });
}

export function toastError(message, title = "Error") {
  pushToast({ type: "error", title, message });
}

export function toastInfo(message, title = "") {
  pushToast({ type: "info", title, message });
}

export function toastWarning(message, title = "Notice") {
  pushToast({ type: "warning", title, message });
}
