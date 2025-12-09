import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useUserMutation } from '@/features/user/services/useUserMutation.ts';
import { useUserQuery } from '@/features/user/services/useUserQuery';
import { Avatar } from '@/shared/components/Avatar';
import { Button } from '@/shared/components/Button';

import styles from './profile-header.module.css';

export const ProfileHeader = () => {
  const { i18n } = useTranslation();
  const { data } = useUserQuery();
  const { mutateAsync, isPending } = useUserMutation();

  const handleSwitchLang = async () => {
    const language = data?.language === 'ru' ? 'en' : 'ru';
    mutateAsync({ language }).then((result) => {
      i18n.changeLanguage(result.language);
    });
  };

  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileInfo}>
        <Avatar image={data?.avatar} />
        <div className={styles.profileContent}>
          <p className={styles.nick}>{data?.first_name || data?.username}</p>
          <p className={styles.line}>Создано: 0</p>
          <p className={styles.line}>Пройдено: 0</p>
        </div>
      </div>
      <Button
        size='sm'
        auto
        loading={isPending}
        onClick={handleSwitchLang}
        after={<Globe />}
      >
        {data?.language === 'ru' ? 'EN' : 'RU'}
      </Button>
    </div>
  );
};
