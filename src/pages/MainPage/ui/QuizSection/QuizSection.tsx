import { ChevronRight } from "lucide-react";
import { navigateTo } from "@/shared/utils/navigateTo";
import IQImg from './iq.jpg'
import styles from "./QuizSection.module.css";

const tests = [
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
      <div className={styles.quizSectionHeader}>
        <p className={styles.quizSectionTitle}>
          Популярные тесты
        </p>
        <button className={styles.quizSectionBtn}>
          см. все
          <ChevronRight color='#333' />
        </button>
      </div>
      <div className={styles.quizList}>
        {tests.map((item) => (
          <div
            key={item.id}
            className={styles.quizItem}
            onClick={() => navigateTo(item.link)}
          >
            <div className={styles.quizImage}>
              {item.image && <img alt={item.title} src={item.image} />}
            </div>
            <p>
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
