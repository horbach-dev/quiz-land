import { create } from 'zustand';

type TSafeArea = {
  top: number
  bottom: number
}

interface AppState {
  safeArea: TSafeArea;
  navigationHeight: number;
  isNavigationVisible: boolean;
  showIntro: boolean
  setSafeArea: (v: TSafeArea) => void;
  setNavigationHeight: (v: number) => void;
  setNavigationVisible: (v: boolean) => void;
  setShowIntro: (v: boolean) => void;
}

export const useAppConfigStore = create<AppState>((set) => ({
  safeArea: { top: 0, bottom: 24 },
  isNavigationVisible: true,
  navigationHeight: 0,
  showIntro: !localStorage.getItem('show-intro'),
  setNavigationHeight: (navigationHeight) => set({ navigationHeight }),
  setNavigationVisible: (isNavigationVisible) => set({ isNavigationVisible }),
  setSafeArea: (safeArea) => {
    alert(safeArea)
    set({ safeArea })
  },
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
