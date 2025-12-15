import { miniApp } from '@tma.js/sdk-react';
import { CircleX, RotateCcw } from 'lucide-react';

import { Button } from '@/shared/components/Button';

import styles from './AppLayoutError.module.css';

export const AppLayoutError = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Произошла обшика</h2>
      <p className={styles.description}>
        Непредвиденный сбой в приложении. <br /> Либо, вы пытаетесь открыть приложение вне
        телеграм
      </p>
      <Button
        after={<RotateCcw />}
        onClick={() => window.location.reload()}
      >
        Перезапустить
      </Button>
      {miniApp?.close?.isAvailable() && (
        <Button
          style='white'
          after={<CircleX />}
          onClick={() => miniApp.close()}
        >
          Закрыть
        </Button>
      )}
    </div>
  );
};
