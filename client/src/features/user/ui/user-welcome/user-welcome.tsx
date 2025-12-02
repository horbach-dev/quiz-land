import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUserQuery } from "../../services/useUserQuery";
import { Avatar } from "@/features/user/ui/avatar";
import styles from './user-welcome.module.css'

export const UserWelcome = () => {
  const { t } = useTranslation();
  const { data } = useUserQuery()
  const nick = data?.first_name || data?.username

  return (
    <div className={styles.userWelcome}>
      <div className={styles.userInfo}>
        <Avatar image={data?.avatar} />
        <p className={styles.welcome}>
          {t('welcome.hello')} {nick && <span>{nick}!</span>}
        </p>
        <p className={styles.welcomeDesc}>
          {t('welcome.description')}
        </p>
      </div>
      <div className={styles.userStatistic}>
        <p className={styles.userStatisticItem}>
          {t('welcome.completed')}
          <span>{data?.quizzes_completed || 0}</span>
        </p>
        <p className={styles.userStatisticItem}>
          {t('welcome.created')}
          <span>{data?.quizzes_created || 0}</span>
        </p>
        <div className={styles.userStatisticBtn}>
          <span>{t('welcome.to_profile')}</span>
          <button type='button' title='в профиль'>
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}
