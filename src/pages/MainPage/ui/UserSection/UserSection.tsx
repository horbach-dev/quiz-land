import { ChevronRight, CircleUserRound } from "lucide-react";
import { useUserQuery } from "@/entities/user";
import styles from "./UserSection.module.css";

export const UserSection = () => {
  const { data } = useUserQuery()
  const nick = data?.first_name || data?.username

  return (
    <div className={styles.userSection}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          {data?.avatar ? (
            <img src={data?.avatar} alt='avatar' />
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
          <span>{data?.quizzes_completed || 0}</span>
        </p>
        <p className={styles.userStatisticItem}>
          Создано <br/> квизов
          <span>{data?.quizzes_created || 0}</span>
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
