import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './SectionHeader.module.css';

interface IProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export const SectionHeader = ({
  title,
  description,
  actions,
  className,
}: IProps) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.top}>
        <p className={styles.title}>{title}</p>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};
