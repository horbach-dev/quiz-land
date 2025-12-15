import clsx from 'clsx';

import styles from './QuizIntro.module.css';

export const QuizIntroSkeleton = () => {
  return (
    <>
      <div className={clsx(styles.title, styles.skeletonLine)}>Loading...</div>
      <div className={clsx(styles.actions, styles.skeletonActions)}>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLine}></div>
      </div>
      <div className={styles.description}>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLine}></div>
      </div>
    </>
  );
};
