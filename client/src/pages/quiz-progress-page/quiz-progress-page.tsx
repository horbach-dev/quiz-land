import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/layouts/page-layout";
import { useQuizQuery } from "@/features/quiz/services/useQuizQuery";
import { Progress } from './ui/Progress';
import { QuizCard } from './ui/QuizCard';
import { QuizFooter } from "./ui/QuizFooter";
import styles from './quiz-progress-page.module.css'

type TAnswers = Record<string, { value: string } | null>

const DELAY_TRANSITION = 300
const quizId = '1'

export default function QuizProgressPage () {
  const { id } = useParams();
  const { data } = useQuizQuery(id!);

  const [isHide, setIsHide] = useState(false);
  const [step, setStep] = useState(0);
  const [isEnd, setEnd] = useState(false);
  const [answers, setAnswers] = useState<TAnswers | []>([]);

  const handleNext = () => {
    if (isHide) return

    if (step === (data?.questions?.length || 0) - 1) {
      setEnd(true)
      return;
    }

    setIsHide(true);

    setTimeout(() => {
      setIsHide(false);
      setStep(prevStep => prevStep + 1);
    }, DELAY_TRANSITION)
  }

  const handlePrev = () => {
    if (isHide) return

    if (step === 0) {
      return;
    }

    setIsHide(true);

    setTimeout(() => {
      setIsHide(false);
      setStep(prevStep => prevStep - 1);
    }, DELAY_TRANSITION)
  }

  const currentQuestion = data?.questions?.[step]

  if (!currentQuestion) {
    return null
  }

  const handleSetValue = (value: string) => {
    handleNext()
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestion.id]: { value }
    }));
  }

  const currentAnswer = answers[currentQuestion.id]

  return (
    <PageLayout withNavigation={false}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Progress
            step={step}
            isShow={!isEnd}
            length={data?.questions?.length || 0}
          />
          <QuizCard
            isShow={!isHide && !isEnd}
            value={currentAnswer?.value || ''}
            setValue={handleSetValue}
            question={currentQuestion}
          />
        </div>
        <QuizFooter
          id={quizId}
          isDone={isEnd}
          disabled={step === 0}
          onClick={isEnd ? handleNext : handlePrev}
        />
      </div>
    </PageLayout>
  )
}
