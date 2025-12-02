import '@/shared/styles/globals.css';
import { PageLayout } from "@/layouts/page-layout";
import { CreateQuizForm } from "@/features/quiz";
import { SectionHeader } from "@/shared/ui/section-header";
import styles from './create-quiz-page.module.css';

export default function CreateQuizPage() {
  return (
    <PageLayout
      withNavigation={false}
      className={styles.container}
    >
      <div className={styles.content}>
        <SectionHeader title='Создание нового квиза' />
        <CreateQuizForm />
      </div>
    </PageLayout>
  )
}
