import { CHANGE_APP_ROUTE_EVENT } from '@/shared/constants';
import { vibrationCallback } from '@/shared/utils/vibrationCallback.ts';

export const navigateTo = (url: string, withVibration: boolean = true) => {
  if (withVibration) {
    vibrationCallback();
  }

  document.dispatchEvent(
    new CustomEvent(CHANGE_APP_ROUTE_EVENT, {
      detail: { pathname: url },
    }),
  );
};
