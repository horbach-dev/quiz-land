import { useTranslation } from 'react-i18next';

import { QuizCard } from '@/features/quiz/components/QuizCard';
import { QuizList } from '@/features/quiz/components/QuizList';
import { useQuizListQuery } from '@/features/quiz/services/useQuizListQuery';
import { PageLayout } from '@/layouts/page-layout';
import { TabBar } from '@/shared/components/TabBar';
import { BASE_URL } from '@/shared/constants';
import { useAppStore } from '@/shared/stores/appStore';

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
          data={data}
          isLoading={isLoading}
          renderItem={(item) => (
            <QuizCard
              key={item.id}
              image={BASE_URL + item.poster}
              title={item.title}
              link={`quiz/${item.id}`}
              actions={
                item?.author && (
                  <div className={styles.author}>
                    <img
                      src={item.author.avatar}
                      className={styles.authorAvatar}
                      alt={item.author.username}
                    />
                    <p className={styles.authorNick}>{item.author.username}</p>
                  </div>
                )
              }
            />
          )}
        />
      </div>
    </PageLayout>
  );
}
