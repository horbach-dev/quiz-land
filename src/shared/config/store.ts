import { create } from 'zustand';

interface AppState {
  navigationHeight: number;
  isNavigationVisible: boolean;
  showIntro: boolean;
  setNavigationHeight: (v: number) => void;
  setNavigationVisible: (v: boolean) => void;
  setShowIntro: (v: boolean) => void;
}

export const useAppConfigStore = create<AppState>((set) => ({
  isNavigationVisible: true,
  navigationHeight: 0,
  showIntro: !localStorage.getItem('show-intro'),
  setNavigationHeight: (navigationHeight) => set({ navigationHeight }),
  setNavigationVisible: (isNavigationVisible) => set({ isNavigationVisible }),
  setShowIntro: (isShow) => {
    if (isShow) {
      localStorage.removeItem('show-intro')
      set({ showIntro: true });
    } else {
      set({ showIntro: false });
      localStorage.setItem('show-intro', 'false')
    }
  },
}));
