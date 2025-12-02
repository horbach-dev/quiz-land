import clsx from "clsx";
import { WheelPicker } from "@/shared/ui/WheelPicker";
import { Options } from "@/shared/ui/Option";
import styles from "./QuizCard.module.css";
import type { TQuizQuestion } from "@/features/quiz/types";

interface IProps {
  isShow: boolean;
  question: TQuizQuestion;
  value: string | null;
  setValue: (value: string) => void;
}

export const QuizCard = ({ isShow, question, value, setValue }: IProps) => {
  const opts = question.options.map(i => ({ label: i.text, value: i.id }))

  console.log(opts)

  return (
    <div className={clsx(
      styles.container,
      !isShow && styles.hide,
    )}>
      <p className={styles.title}>
        {question.text}
      </p>
      {question.type === 'MULTI_CHOICE' && (
        <WheelPicker
          onValueChange={setValue}
          options={opts}
          value={(value as string)}
        />
      )}
      {question.type === 'SINGLE_CHOICE' && (
        <Options
          value={value}
          options={opts}
          onChange={setValue}
        />
      )}
    </div>
  )
}
