import { shareURL } from "@tma.js/sdk-react";
import { Play, Share, RotateCcw } from "lucide-react";
import { APP_URL } from "@/shared/constants";
import { LazyImage } from "@/shared/components/LazyImage";
import { Button } from "@/shared/components/Button";
import type { TQuiz, TQuizSession } from "@/shared/types/quiz";
import { QuizIntroSkeleton } from "./quiz-intro-skeleton";
import styles from "./quiz-intro.module.css";

interface IProps {
  quizData: TQuiz | undefined;
  isSessionLoading: boolean;
  sessionData: TQuizSession | undefined;
  startSession: () => Promise<void>;
  setScreen: (value: 'main' | 'session' | 'finish') => void;
}

export const QuizIntro = ({
  quizData,
  startSession,
  isSessionLoading,
  setScreen,
}: IProps) => {
  const handleShare = () => {
    shareURL(`${APP_URL}?startapp=${quizData?.id}`, `Пройди квиз: ${quizData?.title}`);
  }

  const handleStartSession = () => {
    startSession().then(() => setScreen('session'))
  }

  return (
    <div className={styles.container}>
      <LazyImage
        image={quizData?.poster}
        title={quizData?.title}
      />
      {quizData ? (
        <>
          <p className={styles.title}>
            {quizData?.title}
          </p>
          {quizData?.hasActiveSession && (
            <Button
              loading={isSessionLoading}
              className={styles.resumeButton}
              onClick={handleStartSession}
              after={<Play />}
            >
              Продолжить
            </Button>
          )}
          <div className={styles.actions}>
            {quizData?.hasActiveSession ? (
              <Button
                loading={isSessionLoading}
                onClick={handleStartSession}
                after={<RotateCcw />}
              >
                Начать заново
              </Button>
            ) : (
              <Button
                onClick={handleStartSession}
                after={<Play />}
              >
                Начать
              </Button>
            )}
            <Button
              onClick={handleShare}
              after={<Share />}
            >
              Поделиться
            </Button>
          </div>

          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: quizData?.description || '' }}
          />
        </>
      ) : (
        <QuizIntroSkeleton />
      )}
    </div>
  )
}
