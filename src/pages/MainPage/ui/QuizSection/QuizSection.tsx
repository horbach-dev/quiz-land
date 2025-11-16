import styles from "./QuizSection.module.css";
import {ChevronRight} from "lucide-react";
import { Link } from "react-router-dom";
import IQImg from './iq.jpg'

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
          <Link
            key={item.id}
            className={styles.quizItem}
            to={item.link}
          >
            <div className={styles.quizImage}>
              {item.image && <img alt={item.title} src={item.image} />}
            </div>
            <p>
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
