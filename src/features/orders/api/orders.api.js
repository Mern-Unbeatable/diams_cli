/**
 * Why this file exists:
 * Plain HTTP functions for orders — no React. Feature hooks call these only.
 */

import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

/**
 * @typedef {Record<string, string | number | boolean | undefined>} OrderFilters
 */

/**
 * @param {OrderFilters} [filters]
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<unknown>}
 */
export async function fetchOrders(filters = {}, { signal } = {}) {
  const { data } = await apiClient.get(ENDPOINTS.orders.list, {
    params: filters,
    signal,
  });
  return data;
}

/**
 * @param {string | number} id
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<unknown>}
 */
export async function fetchOrder(id, { signal } = {}) {
  const { data } = await apiClient.get(ENDPOINTS.orders.detail(id), {
    signal,
  });
  return data;
}

/**
 * @param {Record<string, unknown>} payload
 * @returns {Promise<unknown>}
 */
export async function createOrder(payload) {
  const { data } = await apiClient.post(ENDPOINTS.orders.create, payload);
  return data;
}

/**
 * @param {string | number} id
 * @param {Record<string, unknown>} payload
 * @returns {Promise<unknown>}
 */
export async function updateOrder(id, payload) {
  const { data } = await apiClient.patch(ENDPOINTS.orders.update(id), payload);
  return data;
}

/**
 * Cancels (deletes) an order.
 * ENDPOINTS has no dedicated cancel path — uses `orders.remove` (DELETE).
 *
 * @param {string | number} id
 * @returns {Promise<unknown>}
 */
export async function cancelOrder(id) {
  const { data } = await apiClient.delete(ENDPOINTS.orders.remove(id));
  return data;
}
