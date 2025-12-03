import { CircleCheckBig } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "@/constants";
import {QuizCard, QuizList} from "@/features/quiz";
import { useQuizListQuery } from "@/features/quiz";
import { Button } from "@/shared/ui/Button";
import styles from "./QuizSection.module.css";

export const QuizSection = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useQuizListQuery()

  return (
    <div className={styles.quizSection}>
      <div className={styles.quizList}>
        <QuizList
          isLoading={isLoading}
          data={data}
          renderItem={(item) => (
            <QuizCard
              key={item.id}
              image={BASE_URL + item.poster}
              title={item.title}
              link={`quiz/${item.id}`}
            />
          )}
        />
      </div>
      <div className={styles.quizAll}>
        <Button
          to='/quizzes'
          after={<CircleCheckBig />}
        >
          {t('common.all_quizzes')}
        </Button>
      </div>
    </div>
  )
}
