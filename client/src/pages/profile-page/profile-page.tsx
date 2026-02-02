import { SquarePen } from 'lucide-react';

// import { useTranslation } from 'react-i18next';
import { QuizCard } from '@/features/quiz/components/QuizCard';
import { QuizList } from '@/features/quiz/components/QuizList';
import { PageLayout } from '@/layouts/page-layout';
import { Button } from '@/shared/components/Button';
import { SectionHeader } from '@/shared/components/SectionHeader';
import { TabBar } from '@/shared/components/TabBar';
import { useAppStore } from '@/shared/stores/appStore.ts';
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
  // const { t } = useTranslation();
  const profileActiveTab = useAppStore((store) => store.profileActiveTab);
  const setProfileActiveTab = useAppStore((store) => store.setProfileActiveTab);

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
          value={profileActiveTab}
          options={options}
          onChange={(v) => setProfileActiveTab(v as TQuizListType)}
        />
        <QuizList
          listKey='profile-page'
          params={{ type: profileActiveTab }}
          renderItem={({ data }) => (
            <QuizCard
              key={data.id}
              image={buildUrl(data.poster)}
              title={data.title}
              link={
                profileActiveTab === 'completed'
                  ? `completed/${data?.sessions?.[0]?.id}`
                  : `quiz/${data.id}`
              }
              actions={profileActiveTab === 'my' && <CardActions item={data} />}
            />
          )}
        />
      </div>
    </PageLayout>
  );
}
