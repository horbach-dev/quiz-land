import { useNavigate } from 'react-router-dom';
import { hideBackButton, onBackButtonClick, showBackButton } from '@telegram-apps/sdk-react';
import { type PropsWithChildren, useEffect } from 'react';
import { vibrationCallback } from "../utils/vibrationCallback";

export function Page({ children, back = true, backLink }: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   */
  backLink?: string | null
  back?: boolean
}>) {
  const navigate = useNavigate();

  useEffect(() => {
    if (back) {
      showBackButton();
      return onBackButtonClick(() => {
        vibrationCallback()
        if (backLink) {
          navigate(backLink);
        } else {
          navigate(-1);
        }
      });
    }
    hideBackButton();
  }, [back, backLink]);

  return <>{children}</>;
}
