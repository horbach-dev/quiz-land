import { useTranslation } from 'react-i18next';

import { QuizCard } from '@/features/quiz/components/QuizCard';
import { QuizCardAuthor } from '@/features/quiz/components/QuizCard/quiz-card-author';
import { QuizList } from '@/features/quiz/components/QuizList';
import { PageLayout } from '@/layouts/page-layout';
import { TabBar } from '@/shared/components/TabBar';
import { useAppStore } from '@/shared/stores/appStore';
import { buildUrl } from '@/shared/utils/buildUrl';

import { QuizzesPageFilter } from './components/QuizzesPageFilter';
import { QuizzesPageHeader } from './components/QuizzesPageHeader';
import styles from './QuizzesPage.module.css';
import type { TQuizListType } from '@/shared/types/quiz';

const tabOptions = [
  { label: 'quizzes_page.tab.public', value: 'public' },
  { label: 'quizzes_page.tab.my', value: 'my' },
  { label: 'quizzes_page.tab.shared', value: 'shared' },
];

export default function QuizzesPage() {
  const { t } = useTranslation();
  const quizActiveTab = useAppStore((store) => store.quizActiveTab);
  const setQuizActiveTab = useAppStore((store) => store.setQuizActiveTab);

  return (
    <PageLayout>
      <QuizzesPageHeader
        title={t('quizzes_page.title')}
        actions={<QuizzesPageFilter />}
      />
      <div className={styles.container}>
        <div className={styles.tabBar}>
          <TabBar
            value={quizActiveTab}
            options={tabOptions}
            onChange={(v) => setQuizActiveTab(v as TQuizListType)}
          />
        </div>
        <QuizList
          listKey={quizActiveTab}
          params={{ type: quizActiveTab }}
          renderItem={({ data }) => (
            <QuizCard
              key={data.id}
              image={buildUrl(data.poster)}
              title={data.title}
              link={`quiz/${data.id}`}
              actions={
                data?.author && (
                  <QuizCardAuthor
                    avatar={data.author.avatar}
                    username={data.author.username}
                  />
                )
              }
            />
          )}
        />
      </div>
    </PageLayout>
  );
}
