/**
 * Why this file exists:
 * Single source of truth for orders cache keys — components never invent key arrays.
 */

export const orderKeys = {
  all: ["orders"],
  lists: () => [...orderKeys.all, "list"],
  /**
   * @param {Record<string, unknown>} [filters]
   */
  list: (filters = {}) => [...orderKeys.lists(), filters],
  details: () => [...orderKeys.all, "detail"],
  /**
   * @param {string | number} id
   */
  detail: (id) => [...orderKeys.details(), id],
};
