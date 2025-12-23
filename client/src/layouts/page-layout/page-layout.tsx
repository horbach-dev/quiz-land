import { backButton } from '@tma.js/sdk-react';
import clsx from 'clsx';
import { type PropsWithChildren, useEffect } from 'react';

import { useAppStore } from '@/shared/stores/appStore';
import { navigateTo } from '@/shared/utils/navigateTo';

import styles from './page-layout.module.css';

interface IProps {
  backCallback?: () => void;
  back?: boolean;
  withPaddingTop?: boolean;
  withNavigation?: boolean;
  className?: string;
}

export function PageLayout({
  children,
  back = true,
  backCallback,
  withNavigation = true,
  className,
}: PropsWithChildren<IProps>) {
  const setNavigationVisible = useAppStore((state) => state.setNavigationVisible);

  useEffect(() => {
    setNavigationVisible(withNavigation);

    if (back) {
      backButton.show();
      return backButton.onClick(() => {
        if (backCallback) {
          backCallback();
        } else {
          navigateTo('back-navigate');
        }
      });
    }

    backButton.hide();
    // eslint-disable-next-line
  }, [back, backCallback, withNavigation]);

  return (
    <div
      className={clsx(styles.pageLayout, className)}
      style={
        withNavigation
          ? {
              paddingBottom: `calc(var(--navigation-height) + var(--padding-bottom))`,
            }
          : {}
      }
    >
      {children}
    </div>
  );
}
