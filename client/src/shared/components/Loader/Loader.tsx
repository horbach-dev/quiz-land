import clsx from 'clsx';

import styles from './Loader.module.css';

interface IProps {
  global?: boolean;
  hide?: boolean;
}

export const Loader = ({ global = true, hide }: IProps) => {
  return (
    <div
      className={clsx(styles.container, global && styles.containerGlobal, hide && styles.hide)}
    >
      <div className={styles.loader}></div>
    </div>
  );
};
