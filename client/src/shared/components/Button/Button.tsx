import clsx from 'clsx';
import type { ReactNode, SyntheticEvent } from 'react';

import { navigateTo } from '@/shared/utils/navigateTo';
import { vibrationCallback } from '@/shared/utils/vibrationCallback';

import styles from './Button.module.css';

interface IProps {
  style?: 'white' | 'default' | 'icon';
  size?: 'sm' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  to?: string;
  children?: ReactNode;
  before?: ReactNode;
  after?: ReactNode;
  className?: string;
  onClick?: (event: SyntheticEvent) => void;
}

export const Button = ({
  to,
  type = 'button',
  after,
  before,
  disabled,
  loading,
  children,
  onClick,
  className,
  style = 'default',
  size = 'lg',
}: IProps) => {
  const handleClick = (event: SyntheticEvent) => {
    if (to) navigateTo(to, false);
    onClick?.(event);
    vibrationCallback();
  };

  return (
    <button
      type={type}
      className={clsx(
        styles.container,
        after && styles.withAfter,
        before && styles.withBefore,
        styles[`style-${style}`],
        styles[`size-${size}`],
        disabled && styles.disabled,
        className,
      )}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {before && <span className={styles.before}>{before}</span>}
      {style === 'icon' ? (
        children
      ) : (
        <span className={styles.text}>{children}</span>
      )}
      {after && <span className={styles.after}>{after}</span>}
      <span className={clsx(styles.loader, loading && styles.loading)} />
    </button>
  );
};
