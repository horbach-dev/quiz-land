import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import BottomSheet from 'react-light-sheet';

import { Background } from '@/shared/components/Background';
import { useAppStore } from '@/shared/stores/appStore';

import styles from './Drawer.module.css';

const portalContainer = document.getElementById('modals')!;

export const Drawer = ({
  withNavigation = true,
  isOpen,
  onClose,
  title,
  headerActions,
  children,
  actions,
}) => {
  const setNavigationVisible = useAppStore((store) => store.setNavigationVisible);

  useEffect(() => {
    if (withNavigation) {
      setNavigationVisible(!isOpen);
    }
  }, [isOpen, withNavigation, setNavigationVisible]);

  return createPortal(
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      overlayClassName={styles.overlay}
      sheetClassName={styles.container}
      headerClassName={styles.header}
      header={
        (title || headerActions) && (
          <div className={styles.filterHeader}>
            {title && <span className={styles.filterTitle}>{title}</span>}
            {headerActions && <div className={styles.filterAction}>{headerActions}</div>}
          </div>
        )
      }
    >
      <Background absolute />
      <div className={styles.content}>{children}</div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </BottomSheet>,
    portalContainer,
  );
};
