import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppState {
  // UI State
  activeTab: 'users' | 'posts';
  isLoading: boolean;
  error: string | null;

  // User preferences
  theme: 'light' | 'dark';
  language: string;

  // Actions
  setActiveTab: (tab: 'users' | 'posts') => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: string) => void;
  clearError: () => void;
}

export const appStore = create<AppState>()(
  devtools(
    set => ({
      // Initial state
      activeTab: 'users',
      isLoading: false,
      error: null,
      theme: 'light',
      language: 'en',

      // Actions
      setActiveTab: tab => set({ activeTab: tab }),
      setLoading: loading => set({ isLoading: loading }),
      setError: error => set({ error }),
      setTheme: theme => set({ theme }),
      setLanguage: language => set({ language }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'app-store',
    }
  )
);
