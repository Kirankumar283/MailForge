import { AUTH_TOKEN_KEY, AUTH_USER_KEY, MOCK_JWT_TOKEN, MOCK_USER } from '../utils/constants';

/**
 * Attempts login with given credentials against mock user.
 * On success, stores token and user info in localStorage.
 * @param {string} email
 * @param {string} password
 * @returns {{ success: boolean, error?: string }}
 */
export function login(email, password) {
  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    const userData = { name: MOCK_USER.name, email: MOCK_USER.email, role: MOCK_USER.role };
    localStorage.setItem(AUTH_TOKEN_KEY, MOCK_JWT_TOKEN);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
    return { success: true };
  }
  return { success: false, error: 'Invalid email or password' };
}

/**
 * Logs out the current user by clearing auth data from localStorage.
 */
export function logout() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

/**
 * Checks if a user is currently authenticated.
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Gets the current user info from localStorage.
 * @returns {{ name: string, email: string, role: string } | null}
 */
export function getCurrentUser() {
  const userData = localStorage.getItem(AUTH_USER_KEY);
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }
  return null;
}
