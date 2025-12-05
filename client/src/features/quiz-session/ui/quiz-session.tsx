import { useEffect, useRef, useState } from "react";
import type { TQuiz, TQuizAnswer } from "@/shared/types/quiz";
import { useQuizSessionQuery } from "../services/useQuizSessionQuery";
import { useCompleteSessionMutation } from "../services/useCompleteSessionMutation";
import { useSubmitAnswerMutation } from "../services/useSubmitAnswerMutation";
import { useQuizSessionNavigation } from "../hooks/useQuizSessionNavigation";
import { QuizSessionTimer } from "./quiz-session-timer";
import { Progress } from './Progress';
import { QuizSessionStep } from './quiz-session-step';
import { QuizFooter } from "./QuizFooter";
import styles from './quiz-session.module.css'

const getDoneAnswers = (answers: TQuizAnswer[]) => {
  const serverAnswers: TAnswers = {};

  if (answers) {
    answers.forEach((ua) => {
      // Учитываем, что у нас пока single choice (value: submittedOptionIds[0])
      if (ua.submittedOptionIds && ua.submittedOptionIds.length > 0) {
        serverAnswers[ua.questionId] = ua.submittedOptionIds[0];
      }
    });
    return serverAnswers;
  }

  return serverAnswers
}

type TAnswers = Record<string, string | null>

interface IProps {
  quizData: TQuiz
  setScreen: (screen: 'main' | 'finish') => void
}

export function QuizSession ({ quizData, setScreen }: IProps) {
  const { data } = useQuizSessionQuery(quizData.id)
  const { submitAnswer } = useSubmitAnswerMutation()
  const { completeSession } = useCompleteSessionMutation(quizData.id)
  const timeSpent = useRef<number>(data?.session?.timeSpentSeconds || 0);
  const [answers, setAnswers] = useState<TAnswers | []>([]);
  const session = data?.session
  const quizQuestions = quizData.questions

  const initialStepIndex = data?.nextQuestionId
    ? quizQuestions.findIndex(q => q.id === data?.nextQuestionId)
    : 0;

  const initialStep = (initialStepIndex === -1 || initialStepIndex === undefined) ? 0 : initialStepIndex;

  useEffect(() => {
    if (session?.userAnswers) {
      const answers = getDoneAnswers(session?.userAnswers)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnswers(answers);
    }
  }, [session?.userAnswers])

  const {
    step,
    isHide,
    goToNextStep,
    goToPrevStep
  } = useQuizSessionNavigation({ initialStep, totalSteps: quizQuestions.length });

  const currentQuestion = quizQuestions[step]

  if (!currentQuestion || !session) return null

  const handleSetAnswer = async (value: string) => {
    if (!session) return

    try {
      await submitAnswer({
        sessionId: session.id,
        questionId: currentQuestion.id,
        submittedOptionIds: [value],
        timeSpentSeconds: timeSpent.current,
      })

      if (step + 1 === quizQuestions.length) {
        completeSession(session.id).then(() => {
          setScreen('finish')
        });
      } else {
        goToNextStep()
        setAnswers(prevAnswers => ({
          ...prevAnswers,
          [currentQuestion.id]: value
        }));
      }
    } catch (error) {
      console.error('Не удалось отправить ответ', error)
    }
  }

  const currentAnswer = answers[currentQuestion.id]

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Progress
          step={step}
          timer={<QuizSessionTimer timeSpent={timeSpent} />}
          length={quizQuestions.length}
        />
        <QuizSessionStep
          isHide={isHide}
          value={currentAnswer || ''}
          setValue={handleSetAnswer}
          question={currentQuestion}
        />
      </div>
      <QuizFooter
        isDone={false}
        disabled={step === 0}
        onClick={goToPrevStep}
      />
    </div>
  )
}
