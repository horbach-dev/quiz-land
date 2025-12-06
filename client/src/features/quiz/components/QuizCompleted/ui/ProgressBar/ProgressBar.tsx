import clsx from 'clsx';

import styles from './ProgressBar.module.css';

interface IProps {
  percentage: number;
}

const getStatus = (value: number) => {
  if (value >= 80) {
    return 'good';
  }

  if (value >= 50) {
    return 'middle';
  }

  return 'bad';
};

const circumference = 188.495;

export const ProgressBar = ({ percentage = 0 }: IProps) => {
  const validatedPercentage = Math.max(0, Math.min(100, percentage));
  const offset = circumference - (validatedPercentage / 100) * circumference;
  const status = getStatus(validatedPercentage);

  return (
    <div className={styles.container}>
      <svg
        className='progress-ring'
        width='100%'
        height='100%'
        viewBox='0 0 100 100'
        version='1.1'
        style={
          {
            '--circumference-value': circumference,
            '--offset-value': offset,
          } as React.CSSProperties
        }
      >
        <circle
          className={clsx(styles.background)}
          strokeWidth='5'
          fill='transparent'
          r='30'
          cx='50'
          cy='50'
        />
        <circle
          className={clsx(styles.circle, styles[status])}
          strokeWidth='5'
          fill='transparent'
          r='30'
          cx='50'
          cy='50'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
        />
      </svg>
    </div>
  );
};
