import { backButton } from '@tma.js/sdk-react';
import { type PropsWithChildren, useEffect } from 'react';
import clsx from "clsx";
import { useAppConfigStore } from "@/shared/config/store.ts";
import { navigateTo } from "@/shared/utils/navigateTo.ts";
import styles from './page-layout.module.css'

interface IProps {
  backCallback?: () => void;
  back?: boolean
  withPaddingTop?: boolean
  withNavigation?: boolean
  className?: string
}

export function PageLayout({
  children,
  back = true,
  backCallback,
  withNavigation = true,
  className
}: PropsWithChildren<IProps>) {
  const setNavigationVisible = useAppConfigStore(state => state.setNavigationVisible)

  useEffect(() => {
    setNavigationVisible(withNavigation)

    if (back) {
      backButton.show();
      return backButton.onClick(() => {
        if (backCallback) {
          backCallback()
        } else {
          navigateTo('back-navigate');
        }
      });
    }

    backButton.hide();
  }, [back, backCallback, withNavigation]);

  return (
    <div
      className={clsx(styles.pageLayout, className)}
      style={withNavigation ? { paddingBottom: `calc(var(--navigation-height) + var(--padding-bottom))` } : {}}
    >
      {children}
    </div>
  );
}
