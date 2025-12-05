import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/shared/components/Button';
import styles from './QuizFooter.module.css';
import { createPortal } from 'react-dom';

const portalContainer = document.getElementById('footer')!;

interface IProps {
  disabled: boolean;
  onClick: () => void;
  isDone: boolean;
}

export const QuizFooter = ({ disabled, isDone, onClick }: IProps) => {
  return createPortal(
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
    </div>,
    portalContainer,
  );
};
