import clsx from "clsx";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import styles from "./QuizFooter.module.css";

interface IProps {
  id: string;
  disabled: boolean;
  onClick: () => void;
  isDone: boolean;
}

export const QuizFooter = ({ disabled, isDone, onClick }: IProps) => {
  return (
    <div className={clsx(styles.container)}>
      <div className={styles.content}>
        <button
          disabled={disabled}
          className={clsx(styles.btn, isDone && styles.btnDone)}
          onClick={onClick}
        >
          {!isDone && <ChevronsLeft className={styles.arrow} />}
          <span>{isDone ? 'Поделиться' : 'Назад'}</span>
          {isDone && <ChevronsRight className={styles.arrow} />}
        </button>
      </div>
    </div>
  )
}
