import { Flag } from 'lucide-react';
import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { useCssVarElementHeight } from '@/shared/hooks/useCssVarElementHeight';

import styles from './Progress.module.css';

const portalContainer = document.getElementById('header')!;

interface IProps {
  step: number;
  length: number;
  timer: ReactNode;
}

export const Progress = ({ step, timer, length }: IProps) => {
  const containerRef = useCssVarElementHeight('--quiz-progress-page-header-height');
  const width = `${((step + 1) / length) * 100}%`;

  return createPortal(
    <div
      ref={containerRef}
      className={styles.progressWrap}
    >
      {timer}
      <div className={styles.progressContainer}>
        <div className={styles.progressCount}>
          {step + 1} / {length}
        </div>
        <div className={styles.progress}>
          <div
            style={{ width }}
            className={styles.progressTrack}
          />
        </div>
        <Flag className={styles.progressIcon} />
      </div>
    </div>,
    portalContainer,
  );
};
