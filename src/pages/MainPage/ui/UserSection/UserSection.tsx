import { ChevronRight, CircleUserRound } from "lucide-react";
import styles from "./UserSection.module.css";
import { useTelegramUser } from "../../../../shared/hooks/useTelegramUser";

export const UserSection = () => {
  const user = useTelegramUser()
  const nick = user.firstName || user.username

  return (
    <div className={styles.userSection}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          {user.avatar ? (
            <img src={user.avatar} alt='avatar' />
          ) : (
            <CircleUserRound />
          )}
        </div>
        <p className={styles.welcome}>
          Привет {nick && <span>{nick}!</span>}
        </p>
        <p className={styles.welcomeDesc}>
          Время пройти квиз!
        </p>
      </div>
      <div className={styles.userStatistic}>
        <p className={styles.userStatisticItem}>
          Пройдено <br/> квизов
          <span>21</span>
        </p>
        <p className={styles.userStatisticItem}>
          Создано <br/> квизов
          <span>5</span>
        </p>
        <div className={styles.userStatisticBtn}>
          <span>В профиль</span>
          <button>
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}
