import { SquarePen } from 'lucide-react';

import { QuizCard } from '@/features/quiz/components/QuizCard';
import { QuizList } from '@/features/quiz/components/QuizList';
import { useQuizListQuery } from '@/features/quiz/services/useQuizListQuery';
import { PageLayout } from '@/layouts/page-layout';
import { Button } from '@/shared/components/Button';
import { SectionHeader } from '@/shared/components/SectionHeader';
import { buildUrl } from '@/shared/utils/buildUrl';

import styles from './profile-page.module.css';
import { CardActions } from './ui/card-actions';
import { ProfileHeader } from './ui/profile-header';

export default function ProfilePage() {
  const { isLoading, data } = useQuizListQuery({ type: 'my' });

  return (
    <PageLayout>
      <div className={styles.container}>
        <ProfileHeader />
        <SectionHeader
          title={'Созданные квизы'}
          actions={
            <Button
              size='sm'
              to='/create'
              after={<SquarePen />}
            >
              Новый
            </Button>
          }
        />
        <QuizList
          listKey='profile-page'
          isLoading={isLoading}
          data={data}
          renderItem={({ data }) => (
            <QuizCard
              key={data.id}
              image={buildUrl(data.poster)}
              title={data.title}
              link={`quiz/${data.id}`}
              actions={<CardActions item={data} />}
            />
          )}
        />
      </div>
    </PageLayout>
  );
}
