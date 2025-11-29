import {
  hideBackButton,
  onBackButtonClick,
  useLaunchParams,
  showBackButton
} from '@telegram-apps/sdk-react';
import clsx from "clsx";
import { type PropsWithChildren, useEffect } from 'react';
import { useAppConfigStore } from "@/shared/config/store";
import { navigateTo } from "@/shared/utils/navigateTo";
import { RotationAlert } from "@/features/rotation-alert";
import { SwipeRedirect } from "@/features/swipe-redirect";
import styles from './page-layout.module.css'
import {useSafeArea} from "@/shared/hooks/useSafeArea.ts";

const alertRotationPlatform = ['ios', 'android']

interface IProps {
  backLink?: string | null
  back?: boolean
  withPaddingTop?: boolean
  withNavigation?: boolean
  withSwipeRedirect?: boolean
  withRotationAlert?: boolean
  className?: string
}

export function PageLayout({
  children,
  back = true,
  backLink,
  withSwipeRedirect = true,
  withPaddingTop = true,
  withNavigation = true,
  withRotationAlert = true,
  className
}: PropsWithChildren<IProps>) {
  const { top, bottom } = useSafeArea()
  const navigationHeight = useAppConfigStore(state => state.navigationHeight)
  const setNavigationVisible = useAppConfigStore(state => state.setNavigationVisible)

  const { tgWebAppPlatform } = useLaunchParams()
  const isShowRotationAlert = alertRotationPlatform.includes(tgWebAppPlatform)

  useEffect(() => {
    setNavigationVisible(withNavigation)

    if (back) {
      showBackButton();
      return onBackButtonClick(() => {
        navigateTo(backLink ? backLink : 'back-navigate');
      });
    }

    hideBackButton();
  }, [back, backLink, withNavigation]);

  return (
    <div
      className={clsx(styles.container, className)}
      style={{
        '--padding-top': `${top}px`,
        '--padding-bottom': `${bottom}px`,
        paddingTop: withPaddingTop ? top : 0,
        paddingBottom: withNavigation ? navigationHeight + bottom : bottom
      }}
    >
      {withSwipeRedirect && <SwipeRedirect />}
      {children}
      {(isShowRotationAlert && withRotationAlert) && <RotationAlert />}
    </div>
  );
}
