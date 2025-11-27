import type {ReactNode, SyntheticEvent} from "react";
import clsx from "clsx";
import styles from "./Button.module.css";
import {navigateTo} from "@/shared/utils/navigateTo.ts";

interface IProps {
  disabled?: boolean;
  loading?: boolean;
  to?: string;
  children?: ReactNode;
  before?: ReactNode;
  after?: ReactNode;
  onClick?: (event: SyntheticEvent) => void;
}

export const Button = ({ to, after, before, disabled, loading, children, onClick }: IProps) => {
  const handleClick = (event: SyntheticEvent) => {
    if (to) navigateTo(to)
    onClick?.(event)
  }

  return (
    <button
      className={
        clsx(
          styles.container,
          after && styles.withAfter,
          before && styles.withBefore,
          )
      }
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {before && <span className={styles.before}>{before}</span>}
      {children}
      {after && <span className={styles.after}>{after}</span>}
      <span className={clsx(styles.loader, loading && styles.loading)} />
    </button>
  )
}
