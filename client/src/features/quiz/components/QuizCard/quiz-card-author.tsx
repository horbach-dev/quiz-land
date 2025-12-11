import styles from './quiz-card.module.css';

interface IProps {
  avatar?: string;
  username: string;
}

export const QuizCardAuthor = ({ avatar, username }: IProps) => {
  return (
    <div className={styles.author}>
      <img
        src={avatar}
        className={styles.authorAvatar}
        alt={username}
      />
      <p className={styles.authorNick}>{username}</p>
    </div>
  )
};
