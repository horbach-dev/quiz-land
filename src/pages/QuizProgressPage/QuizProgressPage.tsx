import { useEffect, useState } from "react";
import { Progress } from './ui/Progress';
import { QuizCard } from './ui/QuizCard';
import { QuizFooter } from "./ui/QuizFooter";
import { useQuizStore } from "@/stores/quizStore";
import IQImg from "@/pages/QuizPage/iq.jpg";
import { questions } from "@/components/Quiz/questions";
import styles from './Quiz.module.css';

type TAnswers = Record<string, { value: string, point: number } | null>

const DELAY_TRANSITION = 300
const quizId = '1'
const currentQuizTest = {
  id: 1,
  title: 'Тест на уровень зависимости от лудомании',
  description: 'Короткий тест показывает на сколько сильна зависимость от азартных игр.',
  image: IQImg,
  averageScore: 85,
  results: [],
  questions
}

const getAnswers = (questions: any[]) => {
  return questions.reduce((a, v) => {
    a[v.id] = null;
    return a
  }, {} as TAnswers)
}

export const QuizProgressPage = () => {
  const [isHide, setIsHide] = useState(false);
  const [step, setStep] = useState(0);
  const [isEnd, setEnd] = useState(false);
  const { currentQuiz, setCurrentQuiz } = useQuizStore()

  const [answers, setAnswers] = useState<TAnswers | []>([]);

  useEffect(() => {
    if (currentQuiz) {
      return
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnswers(getAnswers(currentQuizTest.questions))
    setCurrentQuiz(currentQuizTest)
  }, [currentQuiz])

  if (!currentQuiz && !answers.length) {
    return null
  }

  const { questions } = currentQuiz!

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
