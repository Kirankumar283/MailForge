import { AUTH_TOKEN_KEY, AUTH_USER_KEY, TEMPLATES_KEY } from '../utils/constants';

/**
 * Redux middleware that auto-persists auth and templates state to localStorage
 * whenever a relevant action is dispatched.
 */
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  // Persist auth state
  if (action.type?.startsWith('auth/')) {
    if (state.auth.isAuthenticated && state.auth.user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(state.auth.user));
      localStorage.setItem(AUTH_TOKEN_KEY, state.auth.token || '');
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  }

  // Persist templates state
  if (action.type?.startsWith('templates/')) {
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(state.templates.items));
  }

  return result;
};

export default localStorageMiddleware;
