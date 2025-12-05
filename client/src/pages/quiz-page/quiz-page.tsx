import { useParams } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import { PageLayout } from "@/layouts/page-layout";
import { QuizSession } from "@/features/quiz-session";
import { useQuizQuery } from "@/features/quiz/services/useQuizQuery";
import { useQuizSessionQuery } from "@/features/quiz-session/services/useQuizSessionQuery";
import { QuizIntro } from "@/features/quiz/components/QuizIntro";
import { QuizCompleted } from "@/features/quiz/components/QuizCompleted";
import styles from './quiz-page.module.css'

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
  const {
    refetch: startSession,
    isLoading: isSessionLoading
  } = useQuizSessionQuery(id!)

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
          startSession={startSession}
          isSessionLoading={isSessionLoading}
          setScreen={handleSetScreen}
        />
      </div>
    </PageLayout>
  )
}
