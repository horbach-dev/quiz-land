import '@/shared/styles/globals.css';

import { useTranslation } from 'react-i18next';

import { CreateQuizForm } from '@/features/create-quiz';
import { PageLayout } from '@/layouts/page-layout';
import { SectionHeader } from '@/shared/components/SectionHeader';

import styles from './create-quiz-page.module.css';

export default function CreateQuizPage() {
  const { t } = useTranslation();

  return (
    <PageLayout withNavigation={false} className={styles.container}>
      <div className={styles.content}>
        <SectionHeader title={t('create_page.title')} />
        <p className={styles.description}>{t('create_page.description')}</p>
        <CreateQuizForm />
      </div>
    </PageLayout>
  );
}
