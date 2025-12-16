import clsx from 'clsx';
import type { CSSProperties } from 'react';

import styles from './ProgressBar.module.css';

const COLORS = ['rgb(240 102 0)', 'rgb(234 225 19)', 'rgb(3 232 246)', 'rgb(3 236 170)'];

const getPositiveColor = (value: number) => {
  if (value >= 75) return COLORS[3];
  if (value >= 50) return COLORS[2];
  if (value >= 25) return COLORS[1];
  return COLORS[0];
};

const getNegativeColor = (value: number) => {
  if (value >= 75) return COLORS[0];
  if (value >= 50) return COLORS[1];
  if (value >= 25) return COLORS[2];
  return COLORS[3];
};

const circumference = 251;

interface IProps {
  isPositive: boolean;
  percentage: number;
}

export const ProgressBar = ({ isPositive = true, percentage = 0 }: IProps) => {
  const validatedPercentage = Math.max(0, Math.min(100, percentage));
  const offset = circumference - (validatedPercentage / 100) * circumference;
  const statusColor = isPositive
    ? getPositiveColor(validatedPercentage)
    : getNegativeColor(validatedPercentage);

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
          r='40'
          cx='50'
          cy='50'
        />
        <circle
          className={styles.circle}
          strokeWidth='5'
          fill='transparent'
          stroke={statusColor}
          r='40'
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
