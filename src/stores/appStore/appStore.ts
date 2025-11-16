import { create } from 'zustand';

interface AppState {
  intro: {
    show: boolean;
    withAnimation: boolean;
  };
  setIntro: (v: boolean, s?: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  intro: {
    show: !localStorage.getItem('show-intro'),
    withAnimation: false,
  },
  setIntro: (isIntro: boolean, withAnimation = false) => {
    set({ intro: { show: isIntro, withAnimation } });
    isIntro ?
      localStorage.removeItem('show-intro') :
      localStorage.setItem('show-intro', 'false')
  },
}));
