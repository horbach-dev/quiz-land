import { PageLayout } from "@/layouts/page-layout";
import { CreateQuizForm } from "@/features/quiz";
import { SectionHeader } from "@/shared/ui/section-header";
import '@/shared/styles/globals.css';
import styles from './create-quiz-page.module.css';
import {useTranslation} from "react-i18next";

export default function CreateQuizPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      withNavigation={false}
      className={styles.container}
    >
      <div className={styles.content}>
        <SectionHeader title={t('create_page.title')} />
        <p className={styles.description}>{t('create_page.description')}</p>
        <CreateQuizForm />
      </div>
    </PageLayout>
  )
}
