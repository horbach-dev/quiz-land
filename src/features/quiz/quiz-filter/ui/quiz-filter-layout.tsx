import { createPortal } from "react-dom";
import BottomSheet from "react-light-sheet";
import styles from "./quiz-filter.module.css";
import { Background } from "@/shared/ui/Background";
import type { ReactNode} from "react";
import { useAppConfigStore } from "@/shared/config/store";

const portalContainer = document.getElementById("modals")!;

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode
  actions: ReactNode
}

export const QuizFilterLayout = ({ isOpen, onClose, children, actions }: IProps) => {
  const { top, bottom } = useAppConfigStore(state => state.safeArea)

  return createPortal(
    <BottomSheet
      overlayClassName={styles.overlay}
      sheetClassName={styles.container}
      headerClassName={styles.header}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Background absolute />
      <div
        style={{ maxHeight: `calc(100vh - ${top + 50}px)` }}
        className={styles.content}
      >
        {children}
        <div
          style={{ bottom, marginTop: `calc(var(--default-padding) + ${bottom}px)` }}
          className={styles.actions}
        >
          {actions}
        </div>
      </div>
    </BottomSheet>,
    portalContainer
  )
}
