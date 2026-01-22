import { SquarePen } from 'lucide-react';
import { useState } from 'react';

import { QuizCard } from '@/features/quiz/components/QuizCard';
import { QuizList } from '@/features/quiz/components/QuizList';
import { PageLayout } from '@/layouts/page-layout';
import { Button } from '@/shared/components/Button';
import { SectionHeader } from '@/shared/components/SectionHeader';
import { TabBar } from '@/shared/components/TabBar';
import type { TQuizListType } from '@/shared/types/quiz';
import { buildUrl } from '@/shared/utils/buildUrl';

import styles from './profile-page.module.css';
import { CardActions } from './ui/card-actions';
import { ProfileHeader } from './ui/profile-header';

const options = [
  { label: 'Пройденные', value: 'completed' },
  { label: 'В процессе', value: 'progress' },
  { label: 'Мои тесты', value: 'my' },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TQuizListType>('completed');

  return (
    <PageLayout>
      <div className={styles.container}>
        <ProfileHeader />
        <SectionHeader
          title={'Ваши тесты'}
          actions={
            <Button
              size='sm'
              to='/create'
              after={<SquarePen />}
            >
              Создать новый
            </Button>
          }
        />
        <TabBar
          className={styles.bar}
          value={activeTab}
          options={options}
          onChange={(v) => setActiveTab(v as TQuizListType)}
        />
        <QuizList
          listKey='profile-page'
          params={{ type: activeTab }}
          renderItem={({ data }) => (
            <QuizCard
              key={data.id}
              image={buildUrl(data.poster)}
              title={data.title}
              link={
                activeTab === 'completed'
                  ? `completed/${data?.sessions?.[0]?.id}`
                  : `quiz/${data.id}`
              }
              actions={activeTab === 'my' && <CardActions item={data} />}
            />
          )}
        />
      </div>
    </PageLayout>
  );
}
