import { create } from 'zustand';
import { useColorMode } from '@chakra-ui/react';

interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  loadFromLocalStorage: () => void;
  persistToLocalStorage: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'light',

  toggleTheme: () => {
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    }));
    get().persistToLocalStorage();
  },

  loadFromLocalStorage: () => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      set({ theme: stored as 'light' | 'dark' });
    }
  },

  persistToLocalStorage: () => {
    localStorage.setItem('theme', get().theme);
  },
}));
