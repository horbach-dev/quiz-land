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

const storeCreator: StateCreator<IPopupState> = (set, get) => {
  const openPopup = <T extends PopupName>(name: T, params: TPopupParams<T>) => {
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

  const closeAll = () => {
    set((state) => ({
      popups: state.popups.map((p) => ({ ...p, isOpen: false })),
    }));
  };

  const initialPopups: TPopup[] = Object.keys(registerPopups).map((name) => ({
    name: name as PopupName,
    close: () => get().closePopup(name as PopupName),
    isOpen: false,
    lastOpen: 0,
    params: { overlayClose: true } as TPopupParams<PopupName>,
  }));

  return {
    popups: initialPopups,
    openPopup,
    closePopup,
    closeAll,
  };
};

export const usePopupStore = create<IPopupState>(storeCreator);
