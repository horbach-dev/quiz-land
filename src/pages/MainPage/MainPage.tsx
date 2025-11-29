import { PageLayout } from "@/layouts/page-layout";
import { UserSection } from "./ui/UserSection";
import { Actions } from "./ui/Actions";
import { QuizSection } from "./ui/QuizSection";
import styles from "./MainPage.module.css";

export default function MainPage () {
  return (
    <PageLayout back={false}>
      <div className={styles.container}>
        <UserSection />
        <Actions />
        <QuizSection />
      </div>
    </PageLayout>
  )
}
