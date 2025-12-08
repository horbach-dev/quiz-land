import { type ReactNode, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { SectionHeader } from '@/shared/components/SectionHeader';

import styles from './QuizzesPageHeader.module.css';

interface IProps {
  actions: ReactNode;
  title: string;
}

const header = document.getElementById('header')!;

export const QuizzesPageHeader = ({ actions, title }: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef?.current?.offsetHeight) {
      document.documentElement.style.setProperty(
        '--quizzes-page-header-height',
        containerRef.current.offsetHeight + 'px',
      );
    }
  }, []);

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
