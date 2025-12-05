import { create } from 'zustand';

interface IAppState {
  isNavigationVisible: boolean;
  showIntro: boolean;
  quizActiveTab: 'public' | 'shared' | 'my';
  setQuizActiveTab: (v: 'public' | 'shared' | 'my') => void;
  setNavigationVisible: (v: boolean) => void;
  setShowIntro: (v: boolean) => void;
}

export const useAppStore = create<IAppState>((set) => ({
  isNavigationVisible: false,
  showIntro: !localStorage.getItem('show-intro'),
  quizActiveTab: 'public',
  setQuizActiveTab: (quizActiveTab) => set({ quizActiveTab }),
  setNavigationVisible: (isNavigationVisible) => set({ isNavigationVisible }),
  setShowIntro: (isShow) => {
    if (isShow) {
      localStorage.removeItem('show-intro');
      set({ showIntro: true });
    } else {
      set({ showIntro: false });
      localStorage.setItem('show-intro', 'false');
    }
  },
}));
