import {
  hideBackButton,
  onBackButtonClick,
  retrieveLaunchParams,
  showBackButton
} from '@telegram-apps/sdk-react';
import clsx from "clsx";
import { type PropsWithChildren, useEffect } from 'react';
import { useAppConfigStore } from "@/shared/config/store";
import { navigateTo } from "@/shared/utils/navigateTo";
import { RotationAlert } from "@/features/rotation-alert";
import styles from './page-layout.module.css'

const launchParams = retrieveLaunchParams();
const isShowRotationAlert = ['ios', 'android'].includes(launchParams?.tgWebAppPlatform)

interface IProps {
  backLink?: string | null
  back?: boolean
  withPaddingTop?: boolean
  withNavigation?: boolean
  withRotationAlert?: boolean
  className?: string
}

export function PageLayout({
  children,
  back = true,
  backLink,
  withPaddingTop = true,
  withNavigation = true,
  withRotationAlert = true,
  className
}: PropsWithChildren<IProps>) {
  const { top, bottom } = useAppConfigStore(state => state.safeArea)
  const navigationHeight = useAppConfigStore(state => state.navigationHeight)
  const setNavigationVisible = useAppConfigStore(state => state.setNavigationVisible)

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
        paddingBottom: withNavigation ? navigationHeight : bottom
      }}
    >
      {children}
      {(isShowRotationAlert && withRotationAlert) && <RotationAlert />}
    </div>
  );
}
