/**
 * Attach consistent toast feedback to a TanStack mutation result.
 */

import { useEffect, useRef } from "react";
import { getErrorMessage, normalizeApiError } from "@/lib/api/errors";
import { toastError, toastSuccess } from "@/lib/feedback/toast-bus";

/**
 * @param {import("@tanstack/react-query").UseMutationResult} mutation
 * @param {{
 *   successMessage?: string | ((data: unknown, variables: unknown) => string),
 *   errorMessage?: string | ((error: unknown) => string),
 *   successTitle?: string,
 *   errorTitle?: string,
 *   silentStatuses?: number[],
 * }} [options]
 */
export function useMutationFeedback(mutation, options = {}) {
  const {
    successMessage = "Saved successfully.",
    errorMessage,
    successTitle = "Success",
    errorTitle = "Request failed",
    silentStatuses = [401],
  } = options;

  const lastSuccess = useRef(null);
  const lastError = useRef(null);

  useEffect(() => {
    if (mutation.isSuccess && mutation.data !== lastSuccess.current) {
      lastSuccess.current = mutation.data;
      const message =
        typeof successMessage === "function"
          ? successMessage(mutation.data, mutation.variables)
          : successMessage;
      if (message) toastSuccess(message, successTitle);
    }
  }, [
    mutation.isSuccess,
    mutation.data,
    mutation.variables,
    successMessage,
    successTitle,
  ]);

  useEffect(() => {
    if (mutation.isError && mutation.error !== lastError.current) {
      lastError.current = mutation.error;
      const info = normalizeApiError(mutation.error);
      if (silentStatuses.includes(info.status)) return;
      const message =
        typeof errorMessage === "function"
          ? errorMessage(mutation.error)
          : errorMessage || getErrorMessage(mutation.error);
      toastError(message, errorTitle);
    }
  }, [
    mutation.isError,
    mutation.error,
    errorMessage,
    errorTitle,
    silentStatuses,
  ]);
}

export default useMutationFeedback;
