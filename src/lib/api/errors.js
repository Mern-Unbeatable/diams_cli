/**
 * Normalize Axios / mock / unknown errors for consistent UI handling.
 */

/**
 * @typedef {{
 *   status: number | null,
 *   code: string,
 *   message: string,
 *   fields: Record<string, string>,
 *   retryable: boolean,
 *   original: unknown,
 * }} ApiErrorInfo
 */

const STATUS_MESSAGES = {
  401: "Your session has expired. Please sign in again.",
  403: "You do not have permission to perform this action.",
  404: "The requested resource was not found.",
  422: "Please fix the highlighted fields and try again.",
  429: "Too many requests. Please wait a moment and try again.",
  500: "Something went wrong on our side. Please try again.",
  502: "Service temporarily unavailable. Please try again.",
  503: "Service temporarily unavailable. Please try again.",
};

/**
 * @param {unknown} error
 * @returns {ApiErrorInfo}
 */
export function normalizeApiError(error) {
  if (!error || typeof error !== "object") {
    return {
      status: null,
      code: "unknown",
      message: "Something went wrong. Please try again.",
      fields: {},
      retryable: true,
      original: error,
    };
  }

  const err = /** @type {any} */ (error);

  if (err.name === "AbortError" || err.code === "ERR_CANCELED") {
    return {
      status: null,
      code: "aborted",
      message: "Request was cancelled.",
      fields: {},
      retryable: false,
      original: error,
    };
  }

  const status =
    err.response?.status ??
    (typeof err.status === "number" ? err.status : null);

  const data = err.response?.data;
  const fields = extractFieldErrors(data);

  let message =
    (typeof data?.message === "string" && data.message) ||
    (typeof data?.error === "string" && data.error) ||
    (typeof err.message === "string" &&
    err.message !== "Network Error" &&
    err.message !== "Not found"
      ? err.message
      : null) ||
    (status && STATUS_MESSAGES[status]) ||
    (err.code === "ECONNABORTED"
      ? "The request timed out. Please try again."
      : null) ||
    (err.message === "Network Error"
      ? "Network error. Check your connection and try again."
      : null) ||
    "Something went wrong. Please try again.";

  if (status === 404 && err.message === "Not found") {
    message = STATUS_MESSAGES[404];
  }

  const retryable =
    status == null ||
    status === 408 ||
    status === 429 ||
    status >= 500;

  return {
    status,
    code: status ? `http_${status}` : err.code || "unknown",
    message,
    fields,
    retryable,
    original: error,
  };
}

/**
 * @param {unknown} data
 * @returns {Record<string, string>}
 */
function extractFieldErrors(data) {
  if (!data || typeof data !== "object") return {};
  const source = /** @type {any} */ (data).errors || /** @type {any} */ (data).fieldErrors;
  if (!source || typeof source !== "object") return {};

  /** @type {Record<string, string>} */
  const fields = {};
  for (const [key, value] of Object.entries(source)) {
    if (typeof value === "string") fields[key] = value;
    else if (Array.isArray(value) && value[0]) fields[key] = String(value[0]);
  }
  return fields;
}

/**
 * @param {unknown} error
 * @returns {string}
 */
export function getErrorMessage(error) {
  return normalizeApiError(error).message;
}

/**
 * @param {unknown} error
 * @returns {boolean}
 */
export function isUnauthorizedError(error) {
  return normalizeApiError(error).status === 401;
}

/**
 * @param {unknown} error
 * @returns {boolean}
 */
export function isForbiddenError(error) {
  return normalizeApiError(error).status === 403;
}

/**
 * @param {unknown} error
 * @returns {boolean}
 */
export function isNotFoundError(error) {
  return normalizeApiError(error).status === 404;
}
