import { Flag } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./Progress.module.css";
import {createPortal} from "react-dom";

const portalContainer = document.getElementById("header")!;

interface IProps {
  isShow: boolean;
  step: number;
  length: number;
}

export const Progress = ({ isShow = true, step, length }: IProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const width = `${((step) / length) * 100}%`

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
      className={clsx(styles.progressWrap, !isShow && styles.hide)}>
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
    </div>,
    portalContainer
  )
}
