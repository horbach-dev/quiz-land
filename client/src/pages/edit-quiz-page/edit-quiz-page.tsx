import '@/shared/styles/globals.css';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { CreateQuizForm } from '@/features/create-quiz';
import { useQuizQuery } from '@/features/quiz/services/useQuizQuery.ts';
import { PageLayout } from '@/layouts/page-layout';
import { SectionHeader } from '@/shared/components/SectionHeader';

import styles from './edit-quiz-page.module.css';

export default function EditQuizPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data } = useQuizQuery(id!);

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
          data={data}
          isEdit={true}
        />
      </div>
    </PageLayout>
  );
}
