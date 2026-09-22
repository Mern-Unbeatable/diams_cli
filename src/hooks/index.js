/**
 * Custom hooks live here.
 *
 * Convention:
 *   src/hooks/useSomething.js
 *   src/hooks/queries/useCustomers.js   (TanStack Query — when backend is ready)
 *   src/hooks/mutations/useCreateCustomer.js
 *
 * Forms: use react-hook-form in components + schemas from
 * `@/lib/validation` (shared) or `@/features/<…>/validation` (feature-owned).
 *
 * Note: `useAuth` stays in `@/context/AuthContext` (with AuthProvider).
 * Re-exported below for convenience.
 */

export { useAuth } from "@/context/AuthContext";
export { useMutationFeedback } from "./useMutationFeedback";
