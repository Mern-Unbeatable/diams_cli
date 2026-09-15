import axiosInstance from "@/api/axiosInstance";

/**
 * Normalize API / Axios errors into a consistent shape.
 */
export const getErrorMessage = (error, fallback = "Something went wrong.") => {
  if (!error) return fallback;

  const data = error?.response?.data;

  if (typeof data === "string" && data.trim()) return data;
  if (data?.message) return data.message;
  if (data?.error) return typeof data.error === "string" ? data.error : fallback;
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
};

/**
 * Unwrap typical API envelopes: { data }, { result }, or raw body.
 */
const unwrap = (response) => {
  const body = response?.data;
  if (body == null) return body;
  if (Object.prototype.hasOwnProperty.call(body, "data")) return body.data;
  if (Object.prototype.hasOwnProperty.call(body, "result")) return body.result;
  return body;
};

/**
 * Reusable CRUD helpers — pass ENDPOINTS paths + optional config.
 *
 * @example
 *   import { apiGet, apiPost } from "@/api/crud";
 *   import { ENDPOINTS } from "@/api/endpoints";
 *
 *   const list = await apiGet(ENDPOINTS.customers.list, { params: { page: 1 } });
 *   await apiPost(ENDPOINTS.customers.create, payload);
 */

export const apiGet = async (url, config = {}) => {
  const response = await axiosInstance.get(url, config);
  return unwrap(response);
};

export const apiPost = async (url, data = {}, config = {}) => {
  const response = await axiosInstance.post(url, data, config);
  return unwrap(response);
};

export const apiPut = async (url, data = {}, config = {}) => {
  const response = await axiosInstance.put(url, data, config);
  return unwrap(response);
};

export const apiPatch = async (url, data = {}, config = {}) => {
  const response = await axiosInstance.patch(url, data, config);
  return unwrap(response);
};

export const apiDelete = async (url, config = {}) => {
  const response = await axiosInstance.delete(url, config);
  return unwrap(response);
};

/**
 * Generic resource CRUD factory (optional convenience).
 *
 * @example
 *   const customersApi = createResourceApi(ENDPOINTS.customers);
 *   await customersApi.list({ params: { page: 1 } });
 *   await customersApi.getById("123");
 *   await customersApi.create({ name: "Amina" });
 */
export const createResourceApi = (resource) => {
  const listPath = resource.list;
  const detailPath = resource.detail;
  const createPath = resource.create || resource.list;
  const updatePath = resource.update || resource.detail;
  const removePath = resource.remove || resource.detail;

  return {
    list: (config) => apiGet(listPath, config),
    getById: (id, config) => apiGet(detailPath(id), config),
    create: (data, config) => apiPost(createPath, data, config),
    update: (id, data, config) => apiPut(updatePath(id), data, config),
    patch: (id, data, config) => apiPatch(updatePath(id), data, config),
    remove: (id, config) => apiDelete(removePath(id), config),
  };
};

export default {
  apiGet,
  apiPost,
  apiPut,
  apiPatch,
  apiDelete,
  createResourceApi,
  getErrorMessage,
};
