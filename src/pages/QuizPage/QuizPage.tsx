import { PageLayout } from "@/layouts/page-layout";
import { questions } from "@/pages/QuizProgressPage/questions";
import IQImg from './iq.jpg'
import styles from './QuizPage.module.css'
import { ChevronsRight } from "lucide-react";
import { navigateTo } from "@/shared/utils/navigateTo";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuizStore } from "@/stores/quizStore";

const currentQuiz = {
  id: 1,
  title: 'Тест на уровень зависимости от лудомании',
  description: 'Короткий тест показывает на сколько сильна зависимость от азартных игр.',
  image: IQImg,
  averageScore: 85,
  results: [],
  questions
}

export function QQ () {
  return <></>
}

export const QuizPage = () => {
  const { setCurrentQuiz } = useQuizStore()
  const { id } = useParams();

  useEffect(() => {
    setCurrentQuiz(currentQuiz)
  }, [id])

  return (
    <PageLayout>
      <div className={styles.container}>
        <img
          className={styles.image}
          src={currentQuiz.image}
          alt={currentQuiz.title}
        />
        <p className={styles.title}>
          {currentQuiz.title}
        </p>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: currentQuiz.description }}
        />
        <button
          onClick={() => navigateTo(`quiz/progress/${id}`)}
          className={styles.footerBtn}
        >
          Начать тест
          <ChevronsRight className={styles.arrow} />
        </button>
      </div>
    </PageLayout>
  )
}
