import {ChevronRight, CircleCheckBig } from "lucide-react";
import styles from "./QuizSection.module.css";
import { QuizList } from "@/features/quiz/quiz-list";
import {Button} from "@/shared/ui/Button";
import {SectionHeader} from "@/shared/ui/section-header";
import IQImg from "@/pages/MainPage/ui/QuizSection/iq.jpg";

const defaultData = [
  { id: 1, title: 'IQ тест', image: IQImg, link: '/quiz/1' },
  { id: 2, title: 'IQ тест', image: IQImg, link: '/quiz/1' },
  { id: 3, title: 'Тест на уровень лени', image: IQImg, link: '/quiz/1' },
  { id: 4, title: 'IQ тест', image: IQImg, link: '/quiz/1' },
  { id: 5, title: 'IQ тест', image: IQImg, link: '/quiz/1' },
  { id: 6, title: 'IQ тест', image: IQImg, link: '/quiz/1' },
  { id: 7, title: 'IQ тест', image: IQImg, link: '/quiz/1' },
  { id: 8, title: 'IQ тест', image: IQImg, link: '/quiz/1' },
  { id: 9, title: 'IQ тест', image: IQImg, link: '/quiz/1' },
  { id: 10, title: 'IQ тест', image: IQImg, link: '/quiz/1' },
]

export const QuizSection = () => {
  return (
    <div className={styles.quizSection}>
      <SectionHeader
        title={'Популярные тесты'}
        actions={(
          <Button
            style='white'
            size='sm'
            to={`/quizzes`}
            after={<ChevronRight color='#333' />}
          >
            см. все
          </Button>
        )}
      />
      <div className={styles.quizList}>
        <QuizList
          view='column'
          data={defaultData}
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
