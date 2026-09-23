/**
 * In-memory mutable collection for demo mocks so mutations survive refetch.
 */

import { applyFilters, findById } from "./mock";

/**
 * @template {Record<string, any>} T
 * @param {T[]} seed
 * @param {string} [idKey]
 */
export function createMockStore(seed, idKey = "id") {
  /** @type {T[]} */
  let items = cloneList(seed);

  return {
    /** @param {Record<string, unknown>} [filters] */
    list(filters = {}) {
      return applyFilters(items, filters);
    },

    /** @param {string | number} id */
    get(id) {
      return findById(items, id, idKey);
    },

    /**
     * @param {string | number} id
     * @param {Partial<T>} patch
     */
    update(id, patch) {
      const index = items.findIndex(
        (item) => String(item?.[idKey]) === String(id),
      );
      if (index === -1) {
        const err = new Error("Not found");
        err.response = { status: 404 };
        throw err;
      }
      items[index] = { ...items[index], ...patch, [idKey]: items[index][idKey] };
      return items[index];
    },

    /** @param {T} row */
    create(row) {
      items = [row, ...items];
      return row;
    },

    /** @param {string | number} id */
    remove(id) {
      const existing = findById(items, id, idKey);
      if (!existing) {
        const err = new Error("Not found");
        err.response = { status: 404 };
        throw err;
      }
      items = items.filter((item) => String(item?.[idKey]) !== String(id));
      return { id, deleted: true };
    },

    reset() {
      items = cloneList(seed);
    },
  };
}

/**
 * @template T
 * @param {T[]} list
 */
function cloneList(list) {
  return list.map((item) =>
    item && typeof item === "object" ? { ...item } : item,
  );
}
