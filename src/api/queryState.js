import { getErrorMessage } from "@/api/crud";

/**
 * Normalize TanStack Query / Axios result into common UI flags.
 *
 * @example
 *   const customers = useQuery({ ... });
 *   const { isLoading, isError, errorMessage, data } = getQueryState(customers);
 */
export const getQueryState = (queryResult, fallbackError) => {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isPending,
    isError,
    isSuccess,
    isFetched,
    status,
    fetchStatus,
  } = queryResult || {};

  return {
    data,
    error,
    isLoading: Boolean(isLoading || isPending),
    isFetching: Boolean(isFetching),
    isError: Boolean(isError),
    isSuccess: Boolean(isSuccess),
    isFetched: Boolean(isFetched),
    status,
    fetchStatus,
    errorMessage: isError ? getErrorMessage(error, fallbackError) : "",
  };
};

/**
 * Same helper for mutations (create / update / delete).
 */
export const getMutationState = (mutationResult, fallbackError) => {
  const { data, error, isPending, isError, isSuccess, isIdle, status } =
    mutationResult || {};

  return {
    data,
    error,
    isLoading: Boolean(isPending),
    isError: Boolean(isError),
    isSuccess: Boolean(isSuccess),
    isIdle: Boolean(isIdle),
    status,
    errorMessage: isError ? getErrorMessage(error, fallbackError) : "",
  };
};

export default { getQueryState, getMutationState };
