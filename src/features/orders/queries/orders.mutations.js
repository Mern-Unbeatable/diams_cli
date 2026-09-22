/**
 * Why this file exists:
 * Write hooks for orders — invalidation stays next to the mutation that caused it.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder, createOrder, updateOrder } from "../api/orders.api";
import { orderKeys } from "./orders.keys";

/**
 * Create an order, then refresh any cached lists.
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createOrder(payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}

/**
 * Update an order, then refresh that detail + all lists.
 */
export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateOrder(id, payload),
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: orderKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}

/**
 * Cancel (delete) an order, then refresh that detail + all lists.
 */
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => cancelOrder(id),
    onSettled: (_data, _error, id) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}
