import { Flag } from "lucide-react";
import { type ReactNode, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Progress.module.css";

const portalContainer = document.getElementById("header")!;

interface IProps {
  step: number;
  length: number;
  timer: ReactNode;
}

export const Progress = ({ step, timer, length }: IProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const width = `${((step + 1) / length) * 100}%`

  useLayoutEffect(() => {
    if (containerRef?.current?.offsetHeight) {
      document.documentElement.style.setProperty(
        "--quiz-progress-page-header-height",
        containerRef.current.offsetHeight + 'px'
      );
    }
  }, [])

  return createPortal(
    <div
      ref={containerRef}
      className={styles.progressWrap}
    >
      {timer}
      <div className={styles.progressContainer}>
        <div className={styles.progressCount}>
          {step + 1} / {length}
        </div>
        <div className={styles.progress}>
          <div
            style={{ width }}
            className={styles.progressTrack}
          />
        </div>
        <Flag className={styles.progressIcon} />
      </div>
    </div>,
    portalContainer
  )
}
