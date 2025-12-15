import { useLayoutEffect, useRef } from 'react';

import { useWindowSize } from '@/shared/hooks/useWindowSize';

export const useCssVarElementHeight = (variable: string) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { width, height } = useWindowSize();

  useLayoutEffect(() => {
    if (ref?.current?.offsetHeight) {
      document.documentElement.style.setProperty(variable, ref.current.offsetHeight + 'px');
    }
  }, [width, height, variable]);

  return ref;
};
