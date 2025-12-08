import { createPortal } from 'react-dom';
import BottomSheet from 'react-light-sheet';

import { Background } from '@/shared/components/Background';

import styles from './Drawer.module.css';

const portalContainer = document.getElementById('modals')!;

export const Drawer = ({
  isOpen,
  onClose,
  title,
  headerActions,
  children,
  actions,
}) => {
  return createPortal(
    <BottomSheet
      overlayClassName={styles.overlay}
      sheetClassName={styles.container}
      headerClassName={styles.header}
      header={
        <div className={styles.filterHeader}>
          <span className={styles.filterTitle}>{title}</span>
          <div className={styles.filterAction}>{headerActions}</div>
        </div>
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <Background absolute />
      <div className={styles.content}>{children}</div>
      <div className={styles.actions}>{actions}</div>
    </BottomSheet>,
    portalContainer,
  );
};
