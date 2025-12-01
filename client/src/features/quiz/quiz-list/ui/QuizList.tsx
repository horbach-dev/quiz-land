import clsx from "clsx";
import {QuizCard, QuizCardSkeleton} from "@/features/quiz";
import { IntersectingWrapper } from "@/features/intersecting-wrapper";
import styles from './QuizList.module.css';

interface IProps {
  view?: 'column' | 'row';
  data: any[];
  isLoading?: boolean;
  isLoadingMore?: boolean;
  handleLoadMore?: () => void;
}

export const QuizList = ({
  view = 'column',
  data,
  handleLoadMore,
  isLoading,
  isLoadingMore
}: IProps) => {
  const isShowSkeleton = (isLoading && !data?.length) || isLoadingMore;

  return (
    <>
      <div className={clsx(styles.container, styles[`container-${view}`])}>
        {data?.map((item) => (
          <QuizCard
            key={item.id}
            image={item.image}
            title={item.title}
            link={`quiz/${item.id}`}
          />
        ))}
        {isShowSkeleton && (
          <>
            <QuizCardSkeleton/>
            <QuizCardSkeleton/>
            <QuizCardSkeleton/>
            <QuizCardSkeleton/>
          </>
        )}
      </div>
      {(
        handleLoadMore &&
        !isLoading &&
        data?.length > 0 &&
        !isLoadingMore
      ) && (
        <IntersectingWrapper onVisible={handleLoadMore} />
      )}
    </>
  )
}
