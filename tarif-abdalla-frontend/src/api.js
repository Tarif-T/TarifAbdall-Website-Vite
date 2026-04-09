const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api").replace(/\/$/, "");
const AUTH_STORAGE_KEY = "tarif-portfolio-auth";

// Reads the persisted auth session from localStorage.
export function readStoredSession() {
  if (globalThis.window === undefined) {
    return null;
  }

  try {
    const value = globalThis.localStorage.getItem(AUTH_STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

// Writes the auth session to localStorage.
export function writeStoredSession(session) {
  if (globalThis.window === undefined) {
    return;
  }

  globalThis.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

// Clears the persisted auth session.
export function clearStoredSession() {
  if (globalThis.window === undefined) {
    return;
  }

  globalThis.localStorage.removeItem(AUTH_STORAGE_KEY);
}

// Returns the currently stored access token, if available.
export function getStoredToken() {
  return readStoredSession()?.token || "";
}

// Sends an API request with optional auth and normalized error handling.
export async function apiRequest(path, options = {}) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const { auth = false, token = getStoredToken(), headers = {}, body, ...fetchOptions } = options;
  const requestHeaders = {
    Accept: "application/json",
    ...(body && !(body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
    ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const response = await fetch(`${API_BASE}${normalizedPath}`, {
    headers: requestHeaders,
    body,
    ...fetchOptions,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload?.success === false) {
    const error = new Error(payload?.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export { API_BASE, AUTH_STORAGE_KEY };
