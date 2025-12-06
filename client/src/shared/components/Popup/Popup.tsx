import clsx from 'clsx';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './Popup.module.css';

const PORTAL_ROOT = document.getElementById('modals')!;
const TRANSITION = 300;

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Popup = ({ isOpen, onClose, children }: PropsWithChildren<IProps>) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsShow(true);
    } else {
      document.body.style.overflow = '';
      setTimeout(() => setIsShow(false), TRANSITION);
    }
  }, [isOpen]);

  if (!isShow) return null;

  return createPortal(
    <div className={clsx(styles.popup, isOpen ? styles.popupOpen : styles.popupClose)}>
      <div className={styles.popupOverlay} onClick={onClose} />
      <div className={styles.popupWrap}>
        <div className={styles.popupContent}>{children}</div>
      </div>
    </div>,
    PORTAL_ROOT,
  );
};
