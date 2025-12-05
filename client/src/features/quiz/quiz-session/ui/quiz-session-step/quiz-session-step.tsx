import clsx from "clsx";
import { BASE_URL } from "@/shared/constants";
import { WheelPicker } from "@/shared/components/WheelPicker";
import { Options } from "@/shared/components/Options";
import { LazyImage } from "@/shared/components/LazyImage";
import type { TQuizQuestion } from "@/features/quiz/types";
import { useSubmitAnswerMutation } from "../../hooks/useSubmitAnswerMutation";
import styles from "./quiz-session-step.module.css";

interface IProps {
  isHide: boolean;
  question: TQuizQuestion;
  value: string | null;
  setValue: (value: string) => void;
}

export const QuizSessionStep = ({ isHide, question, value, setValue }: IProps) => {
  const { isPending } = useSubmitAnswerMutation()
  const options = question.options.map(i => ({ label: i.text, value: i.id }))

  return (
    <div className={clsx(
      styles.container,
      isHide && styles.hide,
      isPending && styles.disabled
    )}>

      {question.image && (
        <LazyImage
          key={question.id}
          image={BASE_URL + question.image}
          title={question.text}
        />
      )}

      <p className={styles.title}>
        {question.text}
      </p>

      {question.type === 'MULTI_CHOICE' && (
        <WheelPicker
          onValueChange={setValue}
          options={options}
          value={(value as string)}
        />
      )}

      {question.type === 'SINGLE_CHOICE' && (
        <Options
          value={value}
          options={options}
          onChange={setValue}
        />
      )}
    </div>
  )
}
