import clsx from 'clsx';

import styles from './toggle.module.css';

interface IProps {
  full?: boolean;
  disabled?: boolean;
  active: boolean;
  label?: string;
  onClick: () => void;
}

export const Toggle = ({ full, active, disabled, label, onClick }: IProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        styles.toggleWrap,
        full && styles.toggleWrapFull,
        disabled && styles.disabled,
      )}
    >
      {label && <span className={styles.toggleLabel}>{label}</span>}
      <div className={clsx(styles.toggle, active && styles.toggleActive)}>
        <div className={styles.togglePoint}></div>
      </div>
    </div>
  );
};
