/**
 * Centralized API configuration for Growvia.
 * In development / unified production: defaults to relative path "" (uses Vite proxy or Express static serving).
 * In split production (e.g. Vercel + Render): uses VITE_API_URL environment variable.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

/**
 * Resolves a full API URL given an endpoint path.
 * @param {string} path - e.g. "/api/courses" or "api/auth/login"
 * @returns {string} - e.g. "/api/courses" or "https://api.growvia.com/api/courses"
 */
export function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export default apiUrl;
