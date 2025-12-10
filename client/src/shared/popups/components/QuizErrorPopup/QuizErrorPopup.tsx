import { Button } from '@/shared/components/Button';

import styles from './QuizErrorPopup.module.css';

interface IProps {
  text: string;
  close: () => void;
}

export const QuizErrorPopup = ({ close, text }: IProps) => {
  return (
    <div className={styles.popup}>
      <p>{text}</p>
      <Button
        to='/quizzes'
        style='white'
        size='lg'
        onClick={close}
      >
        В каталог
      </Button>
    </div>
  );
};
