import { useState } from "react";
import { FilterIcon } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { PageLayout } from "@/layouts/page-layout";
import { QuizList } from "@/features/quiz/quiz-list";
import { QuizFilter } from "@/features/quiz/quiz-filter";
import IQImg from "@/pages/main-page/ui/QuizSection/iq.jpg";
import { QuizzesPageHeader } from "./ui/quizzes-page-header";
import styles from './QuizzesPage.module.css'

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

export default function QuizzesPage () {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState(defaultData)

  const handleShowFilter = () => {
    setIsFilterOpen(true)
  }

  const handleHideFilter = () => {
    setIsFilterOpen(false)
  }

  const handleLoadMore = () => {
    if (data.length > 50) return

    setLoading(true)
    setData(data => {
      return [...data, ...data.map((i, idx) => ({
        ...i,
        id: data[data.length - 1].id + 1 + idx,
      }))]
    })
    setTimeout(() => {
      setLoading(false)
    }, 100)
  }

  return (
    <PageLayout>
      <QuizzesPageHeader
        title={'Библиотека квизов'}
        actions={(
          <Button
            size='sm'
            after={<FilterIcon />}
            onClick={handleShowFilter}
          >
            Поиск
          </Button>
        )}
      />
      <div className={styles.container}>
        <QuizList
          data={data}
          isLoading={isLoading}
          handleLoadMore={handleLoadMore}
        />
      </div>
      <QuizFilter
        isOpen={isFilterOpen}
        onClose={handleHideFilter}
      />
    </PageLayout>
  )
}
