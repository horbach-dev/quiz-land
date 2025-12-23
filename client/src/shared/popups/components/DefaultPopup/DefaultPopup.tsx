import { X } from 'lucide-react';
import type { ReactNode } from 'react';

import styles from './DefaultPopup.module.css';

interface IProps {
  title?: string;
  withClose?: boolean;
  close?: () => void;
  render: ReactNode;
}

export const DefaultPopup = ({ close, withClose = true, title, render }: IProps) => {
  return (
    <div className={styles.popup}>
      {withClose && (
        <button
          className={styles.close}
          onClick={close}
        >
          <X color='#111' />
        </button>
      )}
      {title && <p className={styles.title}>{title}</p>}
      <div className={styles.render}>{render}</div>
    </div>
  );
};
