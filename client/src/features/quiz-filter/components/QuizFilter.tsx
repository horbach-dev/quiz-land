import { SearchCheck, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';
import { Drawer } from '@/shared/components/Drawer';

import styles from './QuizFilter.module.css';

export const QuizFilter = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const handleSearch = () => {
    onClose();
  };

  const handleClearSearch = () => {};

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={t('filter.title')}
      headerActions={
        <Button
          size='sm'
          style='white'
          disabled={true}
          onClick={handleClearSearch}
          after={<Trash2 />}
        >
          {t('filter.clear')}
        </Button>
      }
      actions={
        <Button
          onClick={handleSearch}
          after={<SearchCheck />}
        >
          {t('filter.search')}
        </Button>
      }
    >
      <div className={styles.empty}>
        <p>Приложение пока не нуждается в поиске</p>
      </div>
    </Drawer>
  );
};
