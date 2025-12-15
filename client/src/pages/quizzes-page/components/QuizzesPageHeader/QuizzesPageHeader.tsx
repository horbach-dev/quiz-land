import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { SectionHeader } from '@/shared/components/SectionHeader';
import { useCssVarElementHeight } from '@/shared/hooks/useCssVarElementHeight';

import styles from './QuizzesPageHeader.module.css';

interface IProps {
  actions: ReactNode;
  title: string;
}

const header = document.getElementById('header')!;

export const QuizzesPageHeader = ({ actions, title }: IProps) => {
  const containerRef = useCssVarElementHeight('--quizzes-page-header-height');

  return createPortal(
    <div
      ref={containerRef}
      className={styles.header}
    >
      <div className={styles.content}>
        <SectionHeader
          title={title}
          actions={actions}
        />
      </div>
    </div>,
    header,
  );
};
