import { ChevronRight, SquarePen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/layouts/page-layout';
import { UserWelcome } from '@/features/user';
import { ShareAppButton } from '@/features/share';
import { Button } from '@/shared/components/Button';
import { SectionHeader } from '@/shared/components/SectionHeader';
import { QuizSection } from './ui/QuizSection';
import styles from './main-page.module.css';

export default function MainPage() {
  const { t } = useTranslation();

  return (
    <PageLayout back={false}>
      <div className={styles.container}>
        <div className={styles.userData}>
          <UserWelcome />
        </div>
        <div className={styles.actions}>
          <Button to="/create" after={<SquarePen />}>
            {t('common.create')}
          </Button>
          <ShareAppButton />
        </div>

        <SectionHeader
          title={t('main_page.popular')}
          actions={
            <Button
              style="white"
              size="sm"
              to={`/quizzes`}
              after={<ChevronRight color="#333" />}
            >
              {t('main_page.more')}
            </Button>
          }
        />
        <QuizSection />
      </div>
    </PageLayout>
  );
}
