import { createSlice } from '@reduxjs/toolkit';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY, MOCK_JWT_TOKEN, MOCK_USER } from '../../utils/constants';

/**
 * Load persisted auth state from localStorage.
 */
function loadInitialState() {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userData = localStorage.getItem(AUTH_USER_KEY);
    if (token && userData) {
      return {
        user: JSON.parse(userData),
        token,
        isAuthenticated: true,
        error: null,
      };
    }
  } catch {
    // Corrupted data — fall through to defaults
  }
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
  };
}

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    /**
     * Validate credentials against MOCK_USER and set auth state.
     * payload: { email: string, password: string }
     */
    login(state, action) {
      const { email, password } = action.payload;
      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        state.user = { name: MOCK_USER.name, email: MOCK_USER.email, role: MOCK_USER.role };
        state.token = MOCK_JWT_TOKEN;
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = 'Invalid email or password';
      }
    },

    /**
     * Clear auth state on logout.
     */
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    /**
     * Clear any auth error message.
     */
    clearError(state) {
      state.error = null;
    },
  },
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
