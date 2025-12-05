import styles from "./quiz-card.module.css";
import clsx from "clsx";

export const QuizCardSkeleton = ({ view }) => {
  return (
    <div className={clsx(styles.container, styles.skeleton, styles[view])}>
      <div className={styles.imageWrap} />
      <div className={styles.content}>
        <p className={clsx(styles.title, styles.skeletonTitle)}>.</p>
      </div>
    </div>
  )
}
