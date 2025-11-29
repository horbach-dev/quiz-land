import { create } from 'zustand';

interface IAppState {
  isNavigationVisible: boolean;
  showIntro: boolean;
  setNavigationVisible: (v: boolean) => void;
  setShowIntro: (v: boolean) => void;
}

export const useAppConfigStore = create<IAppState>((set) => ({
  isNavigationVisible: true,
  showIntro: !localStorage.getItem('show-intro'),
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
