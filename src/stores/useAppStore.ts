import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';
type Language = 'en' | 'sc' | 'tc';

interface AppState {
  sidebarOpen: boolean;
  themeMode: ThemeMode;
  language: Language;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
  setLanguage: (lang: Language) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  themeMode: 'light',
  language: 'en',

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setThemeMode: (mode) => set({ themeMode: mode }),
  toggleThemeMode: () =>
    set((state) => ({ themeMode: state.themeMode === 'light' ? 'dark' : 'light' })),
  setLanguage: (language) => set({ language }),
}));
