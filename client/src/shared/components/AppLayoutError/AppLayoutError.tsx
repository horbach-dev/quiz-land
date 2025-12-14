import { House } from 'lucide-react';

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
        after={<House />}
        to='/'
      >
        На главную
      </Button>
    </div>
  );
};
