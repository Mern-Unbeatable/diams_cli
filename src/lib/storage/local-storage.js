/**
 * Thin localStorage helpers — safe JSON get/set used by auth + UI prefs.
 */

export function getItem(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * @param {string} key
 * @param {unknown} [fallback]
 */
export function getJSON(key, fallback = null) {
  const raw = getItem(key);
  if (raw == null) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * @param {string} key
 * @param {unknown} value
 */
export function setJSON(key, value) {
  try {
    return setItem(key, JSON.stringify(value));
  } catch {
    return false;
  }
}
