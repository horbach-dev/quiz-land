import { PageLayout } from "@/layouts/page-layout";
import { CreateQuizForm } from "@/features/quiz";
import '@/shared/styles/globals.css';
import styles from './CreateQuizPage.module.css';

export default function CreateQuizPage() {
  return (
    <PageLayout
      withNavigation={false}
      withRotationAlert={false}
      className={styles.container}
    >
      <div className={styles.content}>
        <h1 className={styles.title}>Создание нового квиза</h1>
        <CreateQuizForm />
      </div>
    </PageLayout>
  )
}
