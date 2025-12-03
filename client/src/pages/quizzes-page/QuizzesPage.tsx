import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "@/constants.ts";
import { PageLayout } from "@/layouts/page-layout";
import { QuizList } from "@/features/quiz/quiz-list";
import { QuizzesPageHeader } from "./ui/quizzes-page-header";
import { QuizzesPageFilter } from "./ui/quizzes-page-filter";
import {QuizCard, useQuizListQuery} from "@/features/quiz";
import { TabBar } from "@/shared/ui/tab-bar";
import styles from './QuizzesPage.module.css'

const tabOptions = [
  { label: "quizzes_page.tab.public", value: "public" },
  { label: "quizzes_page.tab.my", value: "my" },
  { label: "quizzes_page.tab.friends", value: "friends" },
];

type TQuizListParams = {
  type: 'friends' | 'my' | 'public'
}

export default function QuizzesPage () {
  const { t } = useTranslation();
  const [params, setParams] = useState<TQuizListParams>({ type: 'public' });
  const { isLoading, data } = useQuizListQuery(params)

  return (
    <PageLayout>
      <QuizzesPageHeader
        title={t('quizzes_page.title')}
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
    </PageLayout>
  )
}
