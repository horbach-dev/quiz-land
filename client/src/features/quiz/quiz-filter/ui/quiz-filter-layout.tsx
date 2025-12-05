import { createPortal } from "react-dom";
import type { ReactNode} from "react";
import BottomSheet from "react-light-sheet";
import { Background } from "@/shared/components/Background";
import styles from "./quiz-filter.module.css";

const portalContainer = document.getElementById("modals")!;

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode
  clearButton: ReactNode
  searchButton: ReactNode
}

export const QuizFilterLayout = ({
  isOpen,
  onClose,
  children,
  title,
  clearButton,
  searchButton
}: IProps) => createPortal(
  <BottomSheet
    overlayClassName={styles.overlay}
    sheetClassName={styles.container}
    headerClassName={styles.header}
    header={(
      <div className={styles.filterHeader}>
        <span className={styles.filterTitle}>
          {title}
        </span>
        <div className={styles.filterAction}>
          {clearButton}
        </div>
      </div>
    )}
    isOpen={isOpen}
    onClose={onClose}
  >
    <Background absolute />
    <div className={styles.content}>
      {children}
      <div className={styles.actions}>
        {searchButton}
      </div>
    </div>
  </BottomSheet>,
  portalContainer
)
