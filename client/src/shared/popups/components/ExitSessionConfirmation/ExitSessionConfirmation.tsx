import { Button } from '@/shared/components/Button';

import styles from './ExitSessionConfirmation.module.css';

interface IProps {
  close: () => void;
  onConfirm: () => void;
}

export const ExitSessionConfirmation = ({ close, onConfirm }: IProps) => {
  return (
    <div className={styles.popup}>
      <p>Вы действительно хотите прервать прогресс?</p>
      <Button
        onClick={() => {
          close();
          onConfirm();
        }}
      >
        Завершить
      </Button>
      <Button
        style='white'
        size='lg'
        onClick={close}
      >
        Продолжить
      </Button>
    </div>
  );
};
