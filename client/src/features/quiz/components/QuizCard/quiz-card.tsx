import type { ReactNode } from "react";
import clsx from "clsx";
import { navigateTo } from "@/shared/utils/navigateTo";
import { QuizCardImage } from "./quiz-card-image.tsx";
import styles from "./quiz-card.module.css";

interface IProps {
  image: string;
  title: string;
  link: string;
  view?: 'row' | 'column';
  actions?: ReactNode;
}

export const QuizCard = ({ link, title, view = 'column', image, actions }: IProps) => {
  return (
    <div className={clsx(styles.container, styles.card, styles[view])}>
      <div className={styles.content}>
        <div className={styles.imageWrap}>
          <QuizCardImage
            title={title}
            image={image}
          />
        </div>
        <p className={styles.title}>
          {title}
        </p>
        <div
          className={styles.linkOverlay}
          onClick={() => navigateTo(link)}
        />
      </div>
      {actions}
    </div>
  )
}
