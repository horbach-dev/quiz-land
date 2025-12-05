import { Button } from '@/shared/components/Button';
import { SearchCheck, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { QuizFilterLayout } from './quiz-filter-layout.tsx';

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
          size="sm"
          style="white"
          disabled={true}
          onClick={handleClearSearch}
          after={<Trash2 />}
        >
          {t('filter.clear')}
        </Button>
      }
      searchButton={
        <Button onClick={handleSearch} after={<SearchCheck />}>
          {t('filter.search')}
        </Button>
      }
    >
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>ё
    </QuizFilterLayout>
  );
};
