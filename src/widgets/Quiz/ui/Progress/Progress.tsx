import { Flag } from "lucide-react";
import clsx from "clsx";
import styles from "./Progress.module.css";

interface IProps {
  isShow: boolean;
  step: number;
  length: number;
}

export const Progress = ({ isShow = true, step, length }: IProps) => {
  const width = `${((step + 1) / length) * 100}%`
  return (
    <div className={clsx(styles.progressWrap, !isShow && styles.hide)}>
      <div className={styles.progress}>
        <div
          style={{ width }}
          className={styles.progressTrack}
        />
      </div>
      <Flag className={styles.progressIcon} />
    </div>
  )
}
