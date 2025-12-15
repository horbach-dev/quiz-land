import { shareURL } from '@tma.js/sdk-react';
import { ChevronRight, Share, SquarePen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { UserWelcome } from '@/features/user';
import { PageLayout } from '@/layouts/page-layout';
import { Button } from '@/shared/components/Button';
import { SectionHeader } from '@/shared/components/SectionHeader';
import { APP_URL } from '@/shared/constants';

import styles from './main-page.module.css';
import { QuizSection } from './ui/QuizSection';

const text = `Приложение для прохождения и создания тестов!`;

export default function MainPage() {
  const { t } = useTranslation();

  const handleShare = () => {
    shareURL(APP_URL, text);
  };

  return (
    <PageLayout back={false}>
      <div className={styles.container}>
        <div className={styles.userData}>
          <UserWelcome />
        </div>
        <div className={styles.actions}>
          <Button
            to='/create'
            after={<SquarePen />}
          >
            {t('common.create')}
          </Button>
          <Button
            onClick={handleShare}
            after={<Share />}
          >
            {t('common.share')}
          </Button>
        </div>

        <SectionHeader
          title={t('main_page.popular')}
          actions={
            <Button
              style='white'
              size='sm'
              to={`/quizzes`}
              after={<ChevronRight />}
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
