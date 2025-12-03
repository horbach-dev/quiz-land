import styles from './profile-header.module.css'
import { Avatar } from "@/shared/ui/avatar";
import { useUserQuery } from "@/features/user/services/useUserQuery";

export const ProfileHeader = () => {
  const { data } = useUserQuery()

  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileInfo}>
        <Avatar image={data?.avatar} />
        <p className={styles.nick}>
          {data?.first_name || data?.username}
        </p>
      </div>
    </div>
  )
}
