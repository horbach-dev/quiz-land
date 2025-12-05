import { createPortal } from 'react-dom';
import { useWindowSize } from '@/shared/hooks/useWindowSize.ts';
import styles from './RotationAlert.module.css';

const portalRoot = document.getElementById('modals')!;

export const RotationAlert = () => {
  const { width, height } = useWindowSize();

  if (height > width + height / 4) {
    return null;
  }

  return createPortal(
    <div className={styles.container}>
      <p>
        Пожалуйста <br /> поверните устройство
      </p>
    </div>,
    portalRoot,
  );
};
