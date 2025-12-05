import clsx from 'clsx';

import styles from './Background.module.css';

export const Background = ({ absolute }: { absolute?: boolean }) => {
  return (
    <div className={clsx(styles.container, absolute && styles.absolute)}>
      <span className={styles.shadow} />
      <span className={styles.shadow2} />
      <span className={styles.shadow3} />
    </div>
  );
};
