import { useParams } from "react-router-dom";
import { PageLayout } from "@/layouts/page-layout";
import { useQuizQuery } from "@/features/quiz/services/useQuizQuery";
import { useState } from "react";
import { QuizIntro } from "@/features/quiz/quiz-intro";
import { QuizSession } from "@/features/quiz/quiz-session";
import { QuizCompleted } from "@/features/quiz/quiz-completed";
import styles from './quiz-page.module.css'
import clsx from "clsx";

const SCREENS = {
  main: QuizIntro,
  session: QuizSession,
  finish: QuizCompleted,
}

export const QuizPage = () => {
  const [isTransition, setIsTransition] = useState<boolean>(false)
  const [screen, setScreen] = useState('main')
  const { id } = useParams()
  const { data } = useQuizQuery(id!)

  const handleSetScreen = (screen: string) => {
    setIsTransition(true)
    setTimeout(() => {
      setIsTransition(false)
      setScreen(screen)
    }, 300)
  }

  const handleSessionBack = () => handleSetScreen('main')

  const CurrentScreen = SCREENS[screen]

  return (
    <PageLayout
      backCallback={screen === 'session' ? handleSessionBack : undefined}
      withNavigation={screen !== 'session'}
    >
      <div className={clsx(styles.container, isTransition && styles.containerTransition)}>
        <CurrentScreen
          quizData={data}
          setScreen={handleSetScreen}
        />
      </div>
    </PageLayout>
  )
}
