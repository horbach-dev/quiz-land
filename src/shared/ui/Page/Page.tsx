import { hideBackButton, onBackButtonClick, showBackButton } from '@telegram-apps/sdk-react';
import { type PropsWithChildren, useEffect } from 'react';
import { navigateTo } from "@/shared/utils/navigateTo";
import styles from './Page.module.css'

export function Page({ children, back = true, backLink, padding }: PropsWithChildren<{
  backLink?: string | null
  back?: boolean
  padding?: { top?: number; bottom?: number }
}>) {
  useEffect(() => {
    // window.scroll(0, 0);

    if (back) {
      showBackButton();
      return onBackButtonClick(() => {
        navigateTo(backLink ? backLink : 'back-navigate');
      });
    }
    hideBackButton();
  }, [back, backLink]);

  return (
    <div
      className={styles.container}
      style={{
        paddingTop: padding ? padding.top : 'var(--padding-top)',
        paddingBottom: padding ? padding?.bottom : 'var(--padding-bottom)',
      }}
    >
      {children}
    </div>
  );
}
