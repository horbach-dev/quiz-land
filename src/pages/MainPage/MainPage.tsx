import { Page } from "@/shared/ui/Page";
import { UserSection } from "./ui/UserSection";
import { Actions } from "./ui/Actions";
import { QuizSection } from "./ui/QuizSection";
import styles from "./MainPage.module.css";

export const MainPage = () => {
  return (
    <Page back={false}>
      <div className={styles.container}>
        <UserSection />
        <Actions />
        <QuizSection />
      </div>
    </Page>
  )
}
