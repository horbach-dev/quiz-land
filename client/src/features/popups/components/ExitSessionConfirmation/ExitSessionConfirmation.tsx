import { Button } from '@/shared/components/Button';

import styles from './ExitSessionConfirmation.module.css';

export const ExitSessionConfirmation = ({ onCancel, onConfirm }) => {
  return (
    <div className={styles.popup}>
      <p>Вы действительно хотите прервать прогресс?</p>
      <Button onClick={onConfirm}>Завершить</Button>
      <Button
        style='white'
        size='lg'
        onClick={onCancel}
      >
        Продолжить
      </Button>
    </div>
  );
};
