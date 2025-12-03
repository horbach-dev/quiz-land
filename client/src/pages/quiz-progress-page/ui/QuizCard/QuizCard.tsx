import clsx from "clsx";
import { WheelPicker } from "@/shared/ui/WheelPicker";
import { Options } from "@/shared/ui/Option";
import { ImageWithLoading } from "@/shared/ui/image";
import type { TQuizQuestion } from "@/features/quiz/types";
import styles from "./QuizCard.module.css";
import { BASE_URL } from "@/constants.ts";

interface IProps {
  isShow: boolean;
  question: TQuizQuestion;
  value: string | null;
  setValue: (value: string) => void;
}

export const QuizCard = ({ isShow, question, value, setValue }: IProps) => {
  const options = question.options.map(i => ({ label: i.text, value: i.id }))

  return (
    <div className={clsx(
      styles.container,
      !isShow && styles.hide,
    )}>
      {question.image && (
        <ImageWithLoading
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
