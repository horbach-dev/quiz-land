import styles from "./quiz-card.module.css";
import { navigateTo } from "@/shared/utils/navigateTo";
import { QuizCardImage } from "./quiz-card-image";

interface IProps {
  image: string;
  title: string;
  link: string;
}

export const QuizCard = ({ link, title, image }: IProps) => {
  return (
    <div
      className={styles.container}
      onClick={() => navigateTo(link)}
    >
      <div className={styles.quizImageWrap}>
        <QuizCardImage
          title={title}
          image={image}
        />
      </div>
      <p>
        {title}
      </p>
    </div>
  )
}
