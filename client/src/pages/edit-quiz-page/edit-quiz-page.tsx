import '@/shared/styles/globals.css';

import { useTranslation } from 'react-i18next';

import { CreateQuizForm } from '@/features/create-quiz';
import { PageLayout } from '@/layouts/page-layout';
import { SectionHeader } from '@/shared/components/SectionHeader';

import styles from './edit-quiz-page.module.css';

export default function EditQuizPage({ quizData }) {
  const { t } = useTranslation();

  return (
    <PageLayout
      withNavigation={false}
      className={styles.container}
    >
      <div className={styles.content}>
        <SectionHeader
          title={t('create_page.title')}
          description={t('create_page.description')}
        />
        <CreateQuizForm
          data={quizData}
          isEdit={true}
        />
      </div>
    </PageLayout>
  );
}
