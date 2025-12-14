import clsx from 'clsx';

import styles from './Time.module.css';

interface IProps {
  seconds: number;
  className?: string;
}

export const Time = ({ seconds, className }: IProps) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className={clsx(styles.time, className)}>
      {!!hrs && (
        <p className={styles.text}>
          <span>{hrs}</span> ч.
        </p>
      )}
      {!!mins && (
        <p className={styles.text}>
          <span>{mins}</span> мин.
        </p>
      )}
      {!!secs && (
        <p className={styles.text}>
          <span>{pad(secs)}</span> сек.
        </p>
      )}
    </div>
  );
};
