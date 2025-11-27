import clsx from "clsx";
import { WheelPicker } from "@/shared/ui/WheelPicker";
import { Options } from "@/shared/ui/Option";
import type { TQuestion } from "../../questions";
import styles from "./QuizCard.module.css";

interface IProps {
  isShow: boolean;
  question: TQuestion;
  value: string | null;
  setValue: (value: string) => void;
}

export const QuizCard = ({ isShow, question, value, setValue }: IProps) => {
  return (
    <div className={clsx(
      styles.container,
      !isShow && styles.hide,
    )}>
      <p className={styles.title}>
        {question.question}
      </p>
      {question.type === 'option' && (
        <WheelPicker
          onValueChange={setValue}
          options={question.options}
          value={(value as string) || question?.default?.value || question.options[0].value}
        />
      )}
      {question.type === 'select' && (
        <Options
          value={value}
          options={question.options}
          onChange={setValue}
        />
      )}
    </div>
  )
}
