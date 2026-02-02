import { create } from 'zustand';

import type { TQuizListType } from '@/shared/types/quiz';
import { navigateTo } from '@/shared/utils/navigateTo';

interface IAppState {
  isNavigationVisible: boolean;
  showIntro: boolean;
  quizActiveTab: TQuizListType;
  profileActiveTab: TQuizListType;
  globalLoader: boolean;
  globalLoaderKey?: string;
  setGlobalLoader: (v: boolean, key?: string) => void;
  setQuizActiveTab: (v: TQuizListType) => void;
  setProfileActiveTab: (v: TQuizListType) => void;
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
  profileActiveTab: 'completed',
  globalLoader: true,
  setGlobalLoader: (globalLoader: boolean, globalLoaderKey?: string) =>
    set({ globalLoader, globalLoaderKey }),
  swipeRedirectCallback: DEFAULT_SWIPE_REDIRECT_CB,
  setQuizActiveTab: (quizActiveTab) => set({ quizActiveTab }),
  setProfileActiveTab: (profileActiveTab) => set({ profileActiveTab }),
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
