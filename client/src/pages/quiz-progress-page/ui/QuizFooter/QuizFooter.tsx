import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import styles from "./QuizFooter.module.css";

interface IProps {
  id: string;
  disabled: boolean;
  onClick: () => void;
  isDone: boolean;
}

export const QuizFooter = ({ disabled, isDone, onClick }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Button
          onClick={onClick}
          disabled={disabled}
          before={!isDone && <ChevronsLeft />}
          after={isDone && <ChevronsRight />}
        >
          {isDone ? 'Поделиться' : 'Назад'}
        </Button>
      </div>
    </div>
  )
}
