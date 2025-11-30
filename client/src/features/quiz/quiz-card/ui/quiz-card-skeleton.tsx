import styles from "./quiz-card.module.css";
import clsx from "clsx";

export const QuizCardSkeleton = () => {
  return (
    <div className={clsx(styles.container, styles.skeleton)}>
      <div className={styles.imageWrap} />
      <p className={clsx(styles.title, styles.skeletonTitle)}>.</p>
    </div>
  )
}
