import { useEffect, useState } from 'react';

import { debounce } from '@/shared/utils/debounce';

type TWindowSize = {
  width: number;
  height: number;
};

const getWindowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<TWindowSize>(getWindowSize);

  useEffect(() => {
    const updateSize = debounce(() => setWindowSize(getWindowSize));
    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return windowSize;
};
