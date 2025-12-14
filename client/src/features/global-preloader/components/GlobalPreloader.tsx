import { useEffect, useState } from 'react';

import { Loader } from '@/shared/components/Loader';
import { useAppStore } from '@/shared/stores/appStore';

export const GlobalPreloader = () => {
  const globalLoader = useAppStore((state) => state.globalLoader);
  const [isRender, setIsRender] = useState(globalLoader);

  useEffect(() => {
    if (!globalLoader) {
      setTimeout(() => {
        setIsRender(false);
      }, 400);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsRender(true);
    }
  }, [globalLoader]);

  if (!isRender) return null;

  console.log('rerender');

  return (
    <Loader
      global
      hide={!globalLoader}
    />
  );
};
