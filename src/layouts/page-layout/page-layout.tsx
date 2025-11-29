import { backButton, useLaunchParams } from '@tma.js/sdk-react';
import { type PropsWithChildren, useEffect } from 'react';
import clsx from "clsx";
import { useAppConfigStore } from "@/shared/config/store";
import { navigateTo } from "@/shared/utils/navigateTo";
import { RotationAlert } from "@/features/rotation-alert";
import { SwipeRedirect } from "@/features/swipe-redirect";
import styles from './page-layout.module.css'

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
  withNavigation = true,
  withRotationAlert = true,
  className
}: PropsWithChildren<IProps>) {
  const setNavigationVisible = useAppConfigStore(state => state.setNavigationVisible)

  const { tgWebAppPlatform } = useLaunchParams()
  const isShowRotationAlert = alertRotationPlatform.includes(tgWebAppPlatform)

  useEffect(() => {
    setNavigationVisible(withNavigation)

    if (back) {
      backButton.show();
      return backButton.onClick(() => {
        navigateTo(backLink ? backLink : 'back-navigate');
      });
    }

    backButton.hide();
  }, [back, backLink, withNavigation]);

  return (
    <div
      className={clsx(styles.pageLayout, className)}
      style={withNavigation ? { paddingBottom: `calc(var(--navigation-height) + var(--padding-bottom))` } : {}}
    >
      {withSwipeRedirect && <SwipeRedirect />}
      {children}
      {(isShowRotationAlert && withRotationAlert) && <RotationAlert />}
    </div>
  );
}
