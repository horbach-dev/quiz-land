import { ChevronRight, CircleUserRound } from "lucide-react";
import styles from "./UserSection.module.css";
import { useTelegramUser } from "@/shared/hooks/useTelegramUser.ts";

export const UserSection = () => {
  const { photo_url, first_name, username } = useTelegramUser()
  const nick = first_name || username

  return (
    <div className={styles.userSection}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          {photo_url ? (
            <img src={photo_url} alt='avatar' />
          ) : (
            <CircleUserRound />
          )}
        </div>
        <p className={styles.welcome}>
          Привет {nick && <span>{nick}!</span>}
        </p>
        <p className={styles.welcomeDesc}>
          Время создать или пройти квиз!
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
