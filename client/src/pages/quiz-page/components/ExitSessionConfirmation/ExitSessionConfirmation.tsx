import { Button } from '@/shared/components/Button';
import { Popup } from '@/shared/components/Popup';

import styles from './ExitSessionConfirmation.module.css';

export const ExitSessionConfirmation = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onCancel}
    >
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
    </Popup>
  );
};
