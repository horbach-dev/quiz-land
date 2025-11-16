import { useState } from "react";
import { Progress } from './ui/Progress';
import { QuizCard } from './ui/QuizCard';
import { QuizFooter } from "./ui/QuizFooter";
import { questions } from "./questions";
import styles from './Quiz.module.css';

type TAnswers = Record<string, { value: string, point: number } | null>

const DELAY_TRANSITION = 300
const defaultAnswers = questions.reduce((a, v) => {
  a[v.id] = null;
  return a
}, {} as TAnswers)

const quizId = '1'

export const Quiz = () => {
  const [isHide, setIsHide] = useState(false);
  const [step, setStep] = useState(0);
  const [isEnd, setEnd] = useState(false);
  const [answers, setAnswers] = useState<TAnswers>(defaultAnswers);

  const handleNext = () => {
    if (isHide) return

    if (step === questions.length - 1) {
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

  const currentQuestion = questions[step]
  const currentAnswer = answers[currentQuestion.id]

  const handleSetValue = (value: string) => {
    handleNext()

    const variant = currentQuestion.options.find(option => option.value === value);

    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestion.id]: { value, point: variant?.point || 0 }
    }));
  }

  // const points = Object.keys(answers).reduce((a, key) => {
  //   const answer = answers[key]
  //
  //   if (answer?.point) {
  //     return a + answer.point;
  //   }
  //   return a
  // }, 0)

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Progress
          step={step}
          isShow={!isEnd}
          length={questions.length}
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
  )
}
