import { SquarePen } from "lucide-react";
import { BASE_URL } from "@/constants";
import { PageLayout } from "@/layouts/page-layout";
import { QuizCard, QuizList, useQuizListQuery } from "@/features/quiz";
import { SectionHeader } from "@/shared/ui/section-header";
import { Button } from "@/shared/ui/Button";
import { ProfileHeader } from "./ui/profile-header";
import { CardActions } from "./ui/card-actions";
import styles from './profile-page.module.css'

export const ProfilePage = () => {
  const { isLoading, data } = useQuizListQuery({ type: 'my' })

  return (
    <PageLayout>
      <div className={styles.container}>
        <ProfileHeader />
        <SectionHeader
          title={"Созданные квизы"}
          actions={(
            <Button
              size='sm'
              to='/create'
              after={<SquarePen />}
            >
              Новый
            </Button>
          )}
        />
        <QuizList
          isLoading={isLoading}
          data={data}
          renderItem={(item) => (
            <QuizCard
              key={item.id}
              image={BASE_URL + item.poster}
              title={item.title}
              link={`quiz/${item.id}`}
              actions={<CardActions item={item} />}
            />
          )}
        />
      </div>
    </PageLayout>
  )
}
