import { createPortal } from "react-dom";
import BottomSheet from "react-light-sheet";
import styles from "./quiz-filter.module.css";
import { Background } from "@/shared/ui/Background";
import type { ReactNode} from "react";

const portalContainer = document.getElementById("modals")!;

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode
  actions: ReactNode
}

export const QuizFilterLayout = ({ isOpen, onClose, children, actions }: IProps) => {
  return createPortal(
    <BottomSheet
      overlayClassName={styles.overlay}
      sheetClassName={styles.container}
      headerClassName={styles.header}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Background absolute />
      <div className={styles.content}>
        {children}
        <div className={styles.actions}>
          {actions}
        </div>
      </div>
    </BottomSheet>,
    portalContainer
  )
}
