import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { message } from 'antd';
import type { AuthState } from '@/service/auth/types';

// Utility function to load auth state from localStorage
const loadAuthFromStorage = (): Partial<AuthState> => {
  try {
    const authData = localStorage.getItem('auth-storage');
    if (authData) {
      const parsed = JSON.parse(authData);
      // Check if token is expired
      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        // Token expired, clear storage
        localStorage.removeItem('auth-storage');
        return {};
      }
      return {
        isAuthenticated: parsed.isAuthenticated || false,
        user: parsed.user || null,
        token: parsed.token || null,
        isLoading: false,
        error: null,
      };
    }
  } catch (error) {
    console.error('Error loading auth from storage:', error);
    // Clear corrupted data
    localStorage.removeItem('auth-storage');
  }
  return {};
};

interface AuthStoreState extends AuthState {
  // Actions
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setUser: (user: AuthState['user']) => void;
  setToken: (token: string | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setError: (error: string | null) => void;
  saveToStorage: () => void;
}

// Load initial state from localStorage
const initialAuthState = loadAuthFromStorage();

export const useAuthStore = create<AuthStoreState>()(
  devtools(
    set => ({
      // Initial state - load from localStorage if available
      isAuthenticated: initialAuthState.isAuthenticated || false,
      user: initialAuthState.user || null,
      token: initialAuthState.token || null,
      isLoading: false,
      error: null,

      // Actions
      setLoading: (loading: boolean) => {
        set({ isLoading: loading }, false, 'setLoading');
      },

      setUser: (user: AuthState['user']) => {
        set({ user }, false, 'setUser');
      },

      setToken: (token: string | null) => {
        set({ token }, false, 'setToken');
      },

      setAuthenticated: (authenticated: boolean) => {
        set({ isAuthenticated: authenticated }, false, 'setAuthenticated');
      },

      setError: (error: string | null) => {
        set({ error }, false, 'setError');
      },

      clearError: () => {
        set({ error: null }, false, 'clearError');
      },

      saveToStorage: () => {
        const state = useAuthStore.getState();
        if (state.isAuthenticated && state.token && state.user) {
          const authInfo = {
            token: state.token,
            user: state.user,
            isAuthenticated: state.isAuthenticated,
            timestamp: Date.now(),
            expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
          };
          localStorage.setItem('auth-storage', JSON.stringify(authInfo));
        }
      },

      logout: () => {
        // Clear localStorage
        localStorage.removeItem('auth-storage');
        localStorage.removeItem('temp-auth');
        localStorage.removeItem('token');

        set(
          {
            isAuthenticated: false,
            user: null,
            token: null,
            isLoading: false,
            error: null,
          },
          false,
          'logout'
        );
        message.success('Logged out successfully!');
      },
    }),
    {
      name: 'auth-store',
    }
  )
);

// Selector hooks for better performance with proper caching
// Optimized selector hooks for better performance
export const useAuth = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);
  const token = useAuthStore(state => state.token);
  const isLoading = useAuthStore(state => state.isLoading);
  const error = useAuthStore(state => state.error);

  return {
    isAuthenticated,
    user,
    token,
    isLoading,
    error,
  };
};

export const useAuthActions = () => {
  const logout = useAuthStore(state => state.logout);
  const clearError = useAuthStore(state => state.clearError);
  const setLoading = useAuthStore(state => state.setLoading);
  const setUser = useAuthStore(state => state.setUser);
  const setToken = useAuthStore(state => state.setToken);
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);
  const setError = useAuthStore(state => state.setError);
  const saveToStorage = useAuthStore(state => state.saveToStorage);

  return {
    logout,
    clearError,
    setLoading,
    setUser,
    setToken,
    setAuthenticated,
    setError,
    saveToStorage,
  };
};

export default useAuthStore;
