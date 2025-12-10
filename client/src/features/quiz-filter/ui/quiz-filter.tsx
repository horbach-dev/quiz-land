import { SearchCheck, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';

import styles from './quiz-filter.module.css';
import { QuizFilterLayout } from './quiz-filter-layout';

export const QuizFilter = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const handleSearch = () => {
    onClose();
  };

  const handleClearSearch = () => {};

  return (
    <QuizFilterLayout
      isOpen={isOpen}
      onClose={onClose}
      title={t('filter.title')}
      clearButton={
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
      searchButton={
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
    </QuizFilterLayout>
  );
};
