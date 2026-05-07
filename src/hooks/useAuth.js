import { useState, useCallback } from 'react';
import * as authService from '../services/authService';

/**
 * Custom hook for authentication state and actions.
 * @returns {{ user: Object|null, isAuthenticated: boolean, login: Function, logout: Function, error: string|null }}
 */
export function useAuth() {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [isLoggedIn, setIsLoggedIn] = useState(() => authService.isAuthenticated());
  const [error, setError] = useState(null);

  const login = useCallback((email, password) => {
    setError(null);
    const result = authService.login(email, password);
    if (result.success) {
      setUser(authService.getCurrentUser());
      setIsLoggedIn(true);
      return true;
    }
    setError(result.error);
    return false;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsLoggedIn(false);
    setError(null);
  }, []);

  return {
    user,
    isAuthenticated: isLoggedIn,
    login,
    logout,
    error,
  };
}
