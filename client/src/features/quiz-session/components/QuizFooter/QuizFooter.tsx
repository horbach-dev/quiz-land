import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { createPortal } from 'react-dom';

import { Button } from '@/shared/components/Button';

import styles from './QuizFooter.module.css';

const portalContainer = document.getElementById('footer')!;

interface IProps {
  prevDisabled: boolean;
  onPrevClick: () => void;
  onNextClick: () => void;
  isNext: boolean;
}

export const QuizFooter = ({ prevDisabled, isNext, onPrevClick, onNextClick }: IProps) => {
  return createPortal(
    <div className={styles.container}>
      <div className={styles.content}>
        <Button
          onClick={onPrevClick}
          disabled={prevDisabled}
          before={<ChevronsLeft />}
        >
          {'Назад'}
        </Button>
        {isNext && (
          <Button
            onClick={onNextClick}
            after={<ChevronsRight />}
          >
            {'Далее'}
          </Button>
        )}
      </div>
    </div>,
    portalContainer,
  );
};
