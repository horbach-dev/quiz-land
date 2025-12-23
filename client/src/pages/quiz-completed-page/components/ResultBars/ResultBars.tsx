import type { TSessionCategoryStatistic } from '@/shared/types/quiz';

import styles from './ResultBars.module.css';

interface IProps {
  categoryStatistic: TSessionCategoryStatistic[];
}

export const ResultBars = ({ categoryStatistic }: IProps) => {
  console.log(categoryStatistic);
  return (
    <div className={styles.container}>
      {categoryStatistic.map((category, index) => (
        <div
          key={category.id}
          className={styles.barsItem}
        >
          <p className={styles.barsItemTitle}>{category.title}</p>
          <div className={styles.barsItemRow}>
            <p className={styles.barsItemCount}>{category.value}</p>
            <div className={styles.barsItemLine}>
            <span
              className={styles.barsItemProgress}
              style={{
                // width: `100%`,
                width: `${(category.value / category.count) * 100}%`,
                animationDelay: `${index * 100}ms`,
              }}
            />
            </div>
            <p className={styles.barsItemCount}>{category.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
