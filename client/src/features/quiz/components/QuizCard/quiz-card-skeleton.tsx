import clsx from 'clsx';

import styles from './quiz-card.module.css';

export const QuizCardSkeleton = () => {
  return (
    <div className={clsx(styles.container, styles.skeleton)}>
      <div className={styles.imageWrap} />
      <div className={styles.content}>
        <p className={clsx(styles.title, styles.skeletonTitle)}>.</p>
      </div>
    </div>
  );
};
