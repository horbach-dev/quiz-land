import { swipeBehavior, useLaunchParams, viewport } from '@tma.js/sdk-react';
import { useLayoutEffect } from 'react';

const platforms = ['ios', 'android'];

export function useViewportSettings() {
  const { tgWebAppPlatform } = useLaunchParams();
  const isMobile = platforms.includes(tgWebAppPlatform);

  useLayoutEffect(() => {
    if (swipeBehavior?.isSupported()) {
      swipeBehavior?.mount();
      swipeBehavior?.disableVertical();
    }

    if (isMobile && viewport.requestFullscreen?.isAvailable()) {
      viewport.requestFullscreen();
    }
  }, [isMobile]);

  return { isMobile };
}
