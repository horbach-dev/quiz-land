import clsx from 'clsx';

import { QuizIntro } from '@/features/quiz/components/QuizIntro';
import { QuizSession } from '@/features/quiz-session';
import { PageLayout } from '@/layouts/page-layout';

import { useQuizPage } from './hooks/useQuizPage';
import styles from './QuizPage.module.css';

const SCREENS = {
  intro: QuizIntro,
  session: QuizSession,
};

export default function QuizPage() {
  const { quizData, screen, isTransition, handleSessionBack, onStartSession, isLoading } =
    useQuizPage();

  const CurrentScreen = SCREENS[screen];

  return (
    <PageLayout
      backCallback={screen === 'session' ? handleSessionBack : undefined}
      withNavigation={screen !== 'session'}
    >
      <div className={clsx(styles.container, isTransition && styles.hide)}>
        <CurrentScreen
          quizData={quizData!}
          onStartSession={onStartSession}
          isLoading={isLoading}
        />
      </div>
    </PageLayout>
  );
}
