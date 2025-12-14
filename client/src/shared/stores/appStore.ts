import { create } from 'zustand';

import { navigateTo } from '@/shared/utils/navigateTo';

interface IAppState {
  isNavigationVisible: boolean;
  showIntro: boolean;
  quizActiveTab: 'public' | 'shared' | 'my' | 'popular';
  globalLoader: boolean;
  globalLoaderKey?: string;
  setGlobalLoader: (v: boolean, key?: string) => void;
  setQuizActiveTab: (v: 'public' | 'shared' | 'my') => void;
  setNavigationVisible: (v: boolean) => void;
  setShowIntro: (v: boolean) => void;
  swipeRedirectCallback: (() => void) | null;
  setSwipeRedirectCallback: (v: (() => void) | 'default' | null) => void;
}

const DEFAULT_SWIPE_REDIRECT_CB = () => navigateTo('back-navigate');

export const useAppStore = create<IAppState>((set) => ({
  isNavigationVisible: false,
  showIntro: !localStorage.getItem('show-intro'),
  quizActiveTab: 'public',
  globalLoader: true,
  setGlobalLoader: (globalLoader: boolean, globalLoaderKey?: string) =>
    set({ globalLoader, globalLoaderKey }),
  swipeRedirectCallback: DEFAULT_SWIPE_REDIRECT_CB,
  setQuizActiveTab: (quizActiveTab) => set({ quizActiveTab }),
  setNavigationVisible: (isNavigationVisible) => set({ isNavigationVisible }),
  setSwipeRedirectCallback: (swipeRedirectCallback) => {
    set({
      swipeRedirectCallback:
        swipeRedirectCallback === 'default'
          ? DEFAULT_SWIPE_REDIRECT_CB
          : swipeRedirectCallback,
    });
  },
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
