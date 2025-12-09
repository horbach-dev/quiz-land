import { Button } from '@/shared/components/Button';

import styles from './QuizError.module.css';

interface IProps {
  close: () => void;
}

export const QuizError = ({ close }: IProps) => {
  return (
    <div className={styles.popup}>
      <p>Похоже такого теста не существует :(</p>
      <Button
        to='/quizzes'
        onClick={close}
      >
        В каталог
      </Button>
    </div>
  );
};
