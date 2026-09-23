/**
 * Decoupled 401 handler registration (Axios → AuthProvider).
 */

/** @type {null | (() => void)} */
let unauthorizedHandler = null;

/**
 * @param {() => void} handler
 * @returns {() => void} unsubscribe
 */
export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler;
  return () => {
    if (unauthorizedHandler === handler) unauthorizedHandler = null;
  };
}

export function notifyUnauthorized() {
  unauthorizedHandler?.();
}
