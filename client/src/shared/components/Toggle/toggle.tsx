import clsx from 'clsx';

import styles from './toggle.module.css';

interface IProps {
  active: boolean;
  label?: string;
  onClick: () => void;
}

export const Toggle = ({ active, label, onClick }: IProps) => {
  return (
    <div onClick={onClick} className={styles.toggleWrap}>
      {label && <span className={styles.toggleLabel}>{label}</span>}
      <div className={clsx(styles.toggle, active && styles.toggleActive)}>
        <div className={styles.togglePoint}></div>
      </div>
    </div>
  );
};
