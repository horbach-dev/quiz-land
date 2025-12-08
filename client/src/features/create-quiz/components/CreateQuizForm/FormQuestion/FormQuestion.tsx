import { type ReactNode, useEffect, useRef } from 'react';

import styles from './FormQuestion.module.css';

interface QuestionProps {
  index: number;
  renderHeader: ReactNode;
  renderMain: ReactNode;
  renderOptions: ReactNode;
}

export const FormQuestion = ({
  renderHeader,
  renderMain,
  renderOptions,
}: QuestionProps) => {
  const containerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, []);

  return (
    <div
      className={styles.container}
      ref={containerRef}
    >
      {renderHeader}
      {renderMain}
      {renderOptions}
    </div>
  );
};
