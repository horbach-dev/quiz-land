import { shareURL } from '@tma.js/sdk-react';
import { Share } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';
import { APP_URL } from '@/shared/constants';

const text = `Приложение для прохождения и создания квизов!`;

export const ShareAppButton = () => {
  const { t } = useTranslation();

  const handleShare = () => {
    shareURL(APP_URL, text);
  };

  return (
    <Button onClick={handleShare} after={<Share />}>
      {t('common.share')}
    </Button>
  );
};
