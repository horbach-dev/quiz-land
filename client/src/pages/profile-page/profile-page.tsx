import { SquarePen } from "lucide-react";
import { BASE_URL } from "@/shared/constants";
import { PageLayout } from "@/layouts/page-layout";
import { useQuizListQuery } from "@/features/quiz/services/useQuizListQuery";
import { QuizList } from "@/features/quiz/components/QuizList";
import { QuizCard } from "@/features/quiz/components/QuizCard";
import { SectionHeader } from "@/shared/components/SectionHeader";
import { Button } from "@/shared/components/Button";
// import { ProfileHeader } from "./ui/profile-header";
import { CardActions } from "./ui/card-actions";
import styles from './profile-page.module.css'

export const ProfilePage = () => {
  const { isLoading, data } = useQuizListQuery({ type: 'my' })

  return (
    <PageLayout>
      <div className={styles.container}>
        {/*<ProfileHeader />*/}
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
