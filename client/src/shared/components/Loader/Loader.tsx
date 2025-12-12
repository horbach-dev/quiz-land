import clsx from 'clsx';

import styles from './Loader.module.css';

interface IProps {
  global?: boolean;
}

export const Loader = ({ global = true }: IProps) => {
  return (
    <div className={clsx(styles.container, global && styles.containerGlobal)}>
      <div className={styles.loader}></div>
    </div>
  );
};
