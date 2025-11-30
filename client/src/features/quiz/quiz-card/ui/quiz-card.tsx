import styles from "./quiz-card.module.css";
import { navigateTo } from "@/shared/utils/navigateTo.ts";
import { QuizCardImage } from "./quiz-card-image.tsx";
import clsx from "clsx";

interface IProps {
  image: string;
  title: string;
  link: string;
}

export const QuizCard = ({ link, title, image }: IProps) => {
  return (
    <div
      className={clsx(styles.container, styles.card)}
      onClick={() => navigateTo(link)}
    >
      <div className={styles.imageWrap}>
        <QuizCardImage
          title={title}
          image={image}
        />
      </div>
      <p className={styles.title}>
        {title}
      </p>
    </div>
  )
}
