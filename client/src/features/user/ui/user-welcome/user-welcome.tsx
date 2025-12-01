import { ChevronRight } from "lucide-react";
import { useUserQuery } from "../../services/useUserQuery";
import { Avatar } from "@/features/user/ui/avatar";
import styles from './user-welcome.module.css'

export const UserWelcome = () => {
  const { data, isLoading } = useUserQuery()
  const nick = data?.first_name || data?.username

  console.log(data, isLoading)

  return (
    <div className={styles.userWelcome}>
      <div className={styles.userInfo}>
        <Avatar image={data?.avatar} />
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
          <button type='button' title='в профиль'>
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}
