/**
 * Example usage — DO NOT import this in production screens yet.
 * Copy patterns into real hooks when backend is ready.
 *
 * import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
 * import {
 *   apiGet,
 *   apiPost,
 *   ENDPOINTS,
 *   queryKeys,
 *   getQueryState,
 *   ApiStateGate,
 * } from "@/api";
 *
 * // --- List ---
 * export const useCustomers = (filters = {}) => {
 *   const query = useQuery({
 *     queryKey: queryKeys.customers.list(filters),
 *     queryFn: () => apiGet(ENDPOINTS.customers.list, { params: filters }),
 *   });
 *   return { ...query, ...getQueryState(query) };
 * };
 *
 * // --- Create ---
 * export const useCreateCustomer = () => {
 *   const qc = useQueryClient();
 *   return useMutation({
 *     mutationFn: (payload) => apiPost(ENDPOINTS.customers.create, payload),
 *     onSuccess: () => {
 *       qc.invalidateQueries({ queryKey: queryKeys.customers.all });
 *     },
 *   });
 * };
 *
 * // --- In a page ---
 * const customersQuery = useCustomers({ page: 1 });
 * return (
 *   <ApiStateGate state={getQueryState(customersQuery)} onRetry={customersQuery.refetch}>
 *     {(data) => <DataTable data={data} />}
 *   </ApiStateGate>
 * );
 */

export {};
