/**
 * Feature list APIs return either `T[]` or `{ data: T[], total?: number }`.
 */

/**
 * @param {unknown} data
 * @returns {any[]}
 */
export function unwrapList(data) {
  if (data == null) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === "object" && Array.isArray(/** @type {any} */ (data).data)) {
    return /** @type {any} */ (data).data;
  }
  return [];
}

/**
 * @param {unknown} data
 * @returns {number}
 */
export function unwrapTotal(data) {
  if (data && typeof data === "object" && typeof /** @type {any} */ (data).total === "number") {
    return /** @type {any} */ (data).total;
  }
  return unwrapList(data).length;
}
