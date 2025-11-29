import { createPortal } from "react-dom";
import clsx from "clsx";
import type { ReactNode } from "react";
import { SectionHeader } from "@/shared/ui/section-header";
import { useAppConfigStore } from "@/shared/config/store";
import { usePageScroll } from "@/shared/hooks/usePageScroll";
import styles from "./QuizzesPageHeader.module.css";

interface IProps {
  actions: ReactNode;
  title: string;
}

const header = document.getElementById("header")!;

export const QuizzesPageHeader = ({ actions, title }: IProps) => {
  const top = useAppConfigStore(state => state.safeArea.top)
  const scroll = usePageScroll()

  return createPortal(
    <div className={styles.header}>
      <div
        style={{ padding: `calc(${top}px + var(--default-padding)) var(--default-padding) 0` }}
        className={clsx(styles.content, scroll > 20 && styles.headerFill)}
      >
        <SectionHeader
          title={title}
          actions={actions}
        />
      </div>
    </div>,
    header
  )
}
