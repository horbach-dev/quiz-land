import { Button } from '@/shared/components/Button';

import styles from './ExitSessionPopup.module.css';

interface IProps {
  close: () => void;
  onConfirm: () => void;
}

export const ExitSessionPopup = ({ close, onConfirm }: IProps) => {
  return (
    <div className={styles.popup}>
      <p>Вы действительно хотите прервать прогресс?</p>
      <Button onClick={close}>
        Продолжить
      </Button>
      <Button
        style='white'
        size='lg'
        onClick={() => {
          close();
          onConfirm();
        }}
      >
        Завершить
      </Button>
    </div>
  );
};
