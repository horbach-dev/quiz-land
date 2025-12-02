import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Play, Share } from "lucide-react";
import { APP_URL } from "@/constants";
import { PageLayout } from "@/layouts/page-layout";
import { questions } from "@/pages/QuizProgressPage/questions";
import IQImg from './iq.jpg'
import { navigateTo } from "@/shared/utils/navigateTo";
import { useQuizStore } from "@/stores/quizStore";
import { Button } from "@/shared/ui/Button";
import { useQuizQuery } from "@/features/quiz/services/useQuizQuery";
import { shareURL } from "@tma.js/sdk-react";
import { Poster } from "@/pages/QuizPage/ui/poster";
import styles from './quiz-page.module.css'

const currentQuiz = {
  id: 1,
  title: 'Тест на уровень зависимости от лудомании',
  description: 'Короткий тест показывает на сколько сильна зависимость от азартных игр.',
  image: IQImg,
  averageScore: 85,
  results: [],
  questions
}

export const QuizPage = () => {
  const { setCurrentQuiz } = useQuizStore()
  const { id } = useParams();
  const { data } = useQuizQuery(id!)

  useEffect(() => {
    setCurrentQuiz(currentQuiz)
  }, [id])

  const handleShare = () => {
    shareURL(`${APP_URL}?startapp=${id}`, `Пройди квиз: ${data?.title}`);
  }

  return (
    <PageLayout>
      <div className={styles.container}>
        <Poster
          image={data?.poster}
          title={data?.title}
        />
        <p className={styles.title}>
          {data?.title}
        </p>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: data?.description || '' }}
        />
        <div className={styles.actions}>
          <Button
            onClick={() => navigateTo(`quiz/progress/${id}`)}
            after={<Play />}
          >
            Начать тест
          </Button>
          <Button
            onClick={handleShare}
            after={<Share />}
          >
            Поделиться
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}
