import clsx from "clsx";
import { QuizCard } from "@/features/quiz";
import { IntersectingWrapper } from "@/features/intersecting-wrapper";
import styles from './QuizList.module.css';

interface IProps {
  view?: 'column' | 'row';
  data: any[];
  isLoading?: boolean;
  handleLoadMore?: () => void;
}

export const QuizList = ({ view = 'column', data, handleLoadMore, isLoading }: IProps) => {
  return (
    <>
      <div className={clsx(styles.container, styles[`container-${view}`])}>
        {data.map((item) => (
          <QuizCard
            key={item.id}
            image={item.image}
            title={item.title}
            link={item.link}
          />
        ))}
      </div>
      {(handleLoadMore && !isLoading) && (
        <IntersectingWrapper onVisible={handleLoadMore} />
      )}
    </>
  )
}
