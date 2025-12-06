import { useEffect } from 'react';

import type { IClickOutside } from './types';

export function useClickOutside({ onClickOutside, ref, options = {} }: IClickOutside) {
  useEffect(() => {
    const listener = (e) => {
      const excludedElementsSelector = options.excludedElementsSelector;

      const isClickByExcluded =
        excludedElementsSelector &&
        excludedElementsSelector.some((selector) => !!e.target.closest(selector));

      if (!ref.current || ref.current.contains(e.target) || isClickByExcluded) {
        return;
      }

      onClickOutside(e);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [options.excludedElementsSelector, ref, onClickOutside]);
}
