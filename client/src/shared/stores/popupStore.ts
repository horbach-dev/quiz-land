import type { ComponentProps } from 'react';
import { create, type StateCreator } from 'zustand';

import { registerPopups } from '@/shared/popups/registerPopups';

export type PopupName = keyof typeof registerPopups;

type TDefaultParams = {
  overlayClose?: boolean;
};

type TPopupParamsMap = {
  [K in PopupName]: Omit<ComponentProps<(typeof registerPopups)[K]>, 'close'>;
};

type TPopupParams<T extends PopupName> = TPopupParamsMap[T] & TDefaultParams;

export type TPopup<T extends PopupName = PopupName> = {
  name: PopupName;
  isOpen: boolean;
  lastOpen: number;
  close: () => void;
  params: TPopupParams<T>;
};

interface IPopupState {
  popups: TPopup[];
  openPopup: <T extends PopupName>(name: T, params: TPopupParams<T>) => void;
  closePopup: (name: PopupName) => void;
  closeAll: () => void;
}

const storeCreator: StateCreator<IPopupState> = (set) => {
  const openPopup = (name, params) => {
    set((state) => ({
      popups: state.popups.map((popup) => {
        if (popup.name === name) {
          return {
            ...popup,
            isOpen: true,
            lastOpen: Date.now(),
            params: { ...popup.params, ...params },
          };
        }
        return popup;
      }),
    }));
  };

  const closePopup = (name: PopupName) => {
    set((state) => ({
      popups: state.popups.map((popup) =>
        popup.name === name ? { ...popup, isOpen: false } : popup,
      ),
    }));
  };

  return {
    popups: Object.keys(registerPopups).map((name) => ({
      name: name as PopupName,
      close: () => closePopup(name as PopupName),
      isOpen: false,
      lastOpen: 0,
      params: { overlayClose: true },
    })),
    openPopup,
    closePopup,
    closeAll: () => {
      set((state) => ({
        popups: state.popups.map((p) => ({ ...p, isOpen: false })),
      }));
    },
  };
};

export const usePopupStore = create<IPopupState>(storeCreator);
