import { ChevronRight, SquarePen } from "lucide-react";
import { PageLayout } from "@/layouts/page-layout";
import { UserWelcome } from "@/features/user";
import { ShareAppButton } from "@/features/share";
import { Button } from "@/shared/ui/Button";
import { SectionHeader } from "@/shared/ui/section-header";
import { QuizSection } from "./ui/QuizSection";
import styles from "./main-page.module.css";

export default function MainPage () {
  return (
    <PageLayout
      withSwipeRedirect={false}
      back={false}
    >
      <div className={styles.container}>
        <div className={styles.userData}>
          <UserWelcome />
        </div>
        <div className={styles.actions}>
          <Button
            to='/create'
            after={<SquarePen />}
          >
            Создать квиз
          </Button>
          <ShareAppButton />
        </div>

        <SectionHeader
          title='Популярные тесты'
          actions={(
            <Button
              style='white'
              size='sm'
              to={`/quizzes`}
              after={<ChevronRight color='#333' />}
            >
              см. все
            </Button>
          )}
        />
        <QuizSection />
      </div>
    </PageLayout>
  )
}
