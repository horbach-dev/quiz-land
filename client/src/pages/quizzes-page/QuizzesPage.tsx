import { useTranslation } from 'react-i18next';

import { QuizCard } from '@/features/quiz/components/QuizCard';
import { QuizCardAuthor } from '@/features/quiz/components/QuizCard/quiz-card-author';
import { QuizList } from '@/features/quiz/components/QuizList';
import { useQuizListQuery } from '@/features/quiz/services/useQuizListQuery';
import { PageLayout } from '@/layouts/page-layout';
import { TabBar } from '@/shared/components/TabBar';
import { useAppStore } from '@/shared/stores/appStore';
import { buildUrl } from '@/shared/utils/buildUrl';

import styles from './QuizzesPage.module.css';
import { QuizzesPageFilter } from './ui/quizzes-page-filter';
import { QuizzesPageHeader } from './ui/quizzes-page-header';

const tabOptions = [
  { label: 'quizzes_page.tab.public', value: 'public' },
  { label: 'quizzes_page.tab.my', value: 'my' },
  { label: 'quizzes_page.tab.shared', value: 'shared' },
];

type TQuizListParams = {
  type: 'shared' | 'my' | 'public';
};

export default function QuizzesPage() {
  const { t } = useTranslation();
  const quizActiveTab = useAppStore((store) => store.quizActiveTab);
  const setQuizActiveTab = useAppStore((store) => store.setQuizActiveTab);
  const { isLoading, data } = useQuizListQuery({ type: quizActiveTab });

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
            onChange={(v) => setQuizActiveTab(v as TQuizListParams['type'])}
          />
        </div>
        <QuizList
          listKey={quizActiveTab}
          data={data}
          isLoading={isLoading}
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
