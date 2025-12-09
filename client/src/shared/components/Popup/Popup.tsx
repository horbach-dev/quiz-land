import clsx from 'clsx';
import { type PropsWithChildren, useEffect, useState } from 'react';

import styles from './Popup.module.css';

const TRANSITION = 300;

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Popup = ({
  isOpen,
  children,
  onClose,
}: PropsWithChildren<IProps>) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsShow(true);
    } else {
      document.body.style.overflow = '';
      setTimeout(() => setIsShow(false), TRANSITION);
    }
  }, [isOpen]);

  if (!isShow) return null;

  return (
    <div
      className={clsx(
        styles.popup,
        isOpen ? styles.popupOpen : styles.popupClose,
      )}
    >
      <div
        className={styles.popupOverlay}
        onClick={onClose}
      />
      <div className={styles.popupWrap}>
        <div className={styles.popupContent}>{children}</div>
      </div>
    </div>
  );
};
