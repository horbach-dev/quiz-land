import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

interface IProps {
  disabled?: boolean;
  loading?: boolean;
  children?: ReactNode;
  before?: ReactNode;
  after?: ReactNode;
  onClick?: () => void;
}

export const Button = ({ after, before, disabled, loading, children, onClick }: IProps) => {
  return (
    <button
      className={
        clsx(
          styles.container,
          after && styles.withAfter,
          before && styles.withBefore,
          )
      }
      onClick={onClick}
      disabled={disabled || loading}
    >
      {before && <span className={styles.before}>{before}</span>}
      {children}
      {after && <span className={styles.after}>{after}</span>}
      <span className={clsx(styles.loader, loading && styles.loading)} />
    </button>
  )
}
