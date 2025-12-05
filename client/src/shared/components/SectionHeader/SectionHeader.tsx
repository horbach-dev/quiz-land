import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './SectionHeader.module.css';

interface IProps {
  title: string;
  actions?: ReactNode;
  className?: string;
}

export const SectionHeader = ({ title, actions, className }: IProps) => {
  return (
    <div className={clsx(styles.container, className)}>
      <p className={styles.title}>{title}</p>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};
