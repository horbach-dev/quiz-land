import clsx from 'clsx';
import type { CSSProperties } from 'react';

import styles from './ProgressBar.module.css';

interface IProps {
  percentage: number;
}

const getStatusColor = (value: number) => {
  if (value >= 70) {
    return 'rgb(19 234 170)';
  }

  if (value >= 55) {
    return 'rgb(192 246 3)';
  }

  if (value >= 40) {
    return 'rgb(234 225 19)';
  }

  return 'rgb(240 102 0)';
};

const circumference = 188.495;

export const ProgressBar = ({ percentage = 0 }: IProps) => {
  const validatedPercentage = Math.max(0, Math.min(100, percentage));
  const offset = circumference - (validatedPercentage / 100) * circumference;
  const statusColor = getStatusColor(validatedPercentage);

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
          } as CSSProperties
        }
      >
        <defs>
          <filter id='svgRegisteringColor'>
            <feDropShadow
              dx='0'
              dy='0'
              stdDeviation='2'
              floodColor={statusColor}
            ></feDropShadow>
          </filter>
        </defs>
        <circle
          className={clsx(styles.background)}
          strokeWidth='5'
          fill='transparent'
          r='30'
          cx='50'
          cy='50'
        />
        <circle
          className={styles.circle}
          strokeWidth='5'
          fill='transparent'
          stroke={statusColor}
          r='30'
          cx='50'
          cy='50'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
          filter='url(#svgRegisteringColor)'
        />
      </svg>
    </div>
  );
};
