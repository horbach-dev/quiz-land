import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "@/shared/constants";
import { PageLayout } from "@/layouts/page-layout";
import { QuizList } from "@/features/quiz/quiz-list";
import { QuizzesPageHeader } from "./ui/quizzes-page-header";
import { QuizzesPageFilter } from "./ui/quizzes-page-filter";
import { useQuizListQuery} from "@/features/quiz/services/useQuizListQuery";
import { QuizCard } from "@/features/quiz/quiz-card";
import { TabBar } from "@/shared/components/TabBar";
import styles from './QuizzesPage.module.css'

const tabOptions = [
  { label: "quizzes_page.tab.public", value: "public" },
  { label: "quizzes_page.tab.my", value: "my" },
  { label: "quizzes_page.tab.shared", value: "shared" },
];

type TQuizListParams = {
  type: 'shared' | 'my' | 'public'
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
              actions={item?.author && (
                <div className={styles.author}>
                  <img
                    src={item.author.avatar}
                    className={styles.authorAvatar}
                    alt={item.author.username}
                  />
                  <p className={styles.authorNick}>
                    {item.author.username}
                  </p>
                </div>
              )}
            />
          )}
        />
      </div>
    </PageLayout>
  )
}
