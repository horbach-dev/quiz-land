import { useState } from "react";
import { PageLayout } from "@/layouts/page-layout";
import { QuizList } from "@/features/quiz/quiz-list";
import { QuizzesPageHeader } from "./ui/quizzes-page-header";
import { QuizzesPageFilter } from "./ui/quizzes-page-filter";
import { useQuizListQuery } from "@/features/quiz";
import { TabBar } from "@/shared/ui/tab-bar";
import styles from './QuizzesPage.module.css'

const tabOptions = [
  { label: "Публичные", value: "public" },
  { label: "Личные", value: "my" },
  { label: "Друзей", value: "friends" },
];

type TQuizListParams = {
  type: 'friends' | 'my' | 'public'
}

export default function QuizzesPage () {
  const [params, setParams] = useState<TQuizListParams>({ type: 'public' });
  const { isLoading, data } = useQuizListQuery(params)

  return (
    <PageLayout>
      <QuizzesPageHeader
        title={'Библиотека квизов'}
        actions={<QuizzesPageFilter />}
      />
      <div className={styles.container}>
        <div className={styles.tabBar}>
          <TabBar
            value={params.type}
            options={tabOptions}
            onChange={(value) => {
              setParams(prev => ({ ...prev, type: value as TQuizListParams['type'] }))
            }}
          />
        </div>
        <QuizList
          data={data}
          isLoading={isLoading}
        />
      </div>
    </PageLayout>
  )
}
