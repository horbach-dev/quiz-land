import { useUserQuery } from '@/features/user/services/useUserQuery';
import { Avatar } from '@/shared/components/Avatar';

import styles from './profile-header.module.css';

export const ProfileHeader = () => {
  const { data } = useUserQuery();

  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileInfo}>
        <Avatar image={data?.avatar} />
        <p className={styles.nick}>{data?.first_name || data?.username}</p>
      </div>
    </div>
  );
};
