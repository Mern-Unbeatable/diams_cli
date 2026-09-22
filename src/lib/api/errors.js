/**
 * Why this file exists:
 * Normalize Axios/network errors for UI without pulling in legacy crud helpers.
 */

/**
 * @param {unknown} error
 * @param {string} [fallback]
 * @returns {string}
 */
export function getErrorMessage(error, fallback = "Something went wrong.") {
  if (!error) return fallback;

  const data = error?.response?.data;

  if (typeof data === "string" && data.trim()) return data;
  if (data?.message) return data.message;
  if (data?.error) {
    return typeof data.error === "string" ? data.error : fallback;
  }
  if (Array.isArray(data?.errors) && data.errors[0]) {
    const first = data.errors[0];
    return typeof first === "string" ? first : first?.message || fallback;
  }
  if (error?.message === "Network Error") {
    return "Network error. Please check your connection.";
  }
  if (error?.code === "ECONNABORTED") {
    return "Request timed out. Please try again.";
  }
  if (error?.message) return error.message;

  return fallback;
}
