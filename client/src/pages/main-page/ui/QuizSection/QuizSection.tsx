import { CircleCheckBig } from "lucide-react";
import { QuizList } from "@/features/quiz";
import { useQuizListQuery } from "@/features/quiz";
import { Button } from "@/shared/ui/Button";
import styles from "./QuizSection.module.css";

export const QuizSection = () => {
  const { data, isLoading } = useQuizListQuery()

  return (
    <div className={styles.quizSection}>
      <div className={styles.quizList}>
        <QuizList
          view='column'
          isLoading={isLoading}
          data={data}
        />
      </div>
      <div className={styles.quizAll}>
        <Button
          to='/quizzes'
          after={<CircleCheckBig />}
        >
          Все квизы
        </Button>
      </div>
    </div>
  )
}
