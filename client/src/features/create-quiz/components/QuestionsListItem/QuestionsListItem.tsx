import { Trash2 } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';
import { FieldLegend, FieldSeparator } from '@/shared/shadcn/ui/field';

import { QuestionOptionsList } from '../QuestionOptionsList';
import { QuestionGeneralFields } from './components/QuestionGeneralFields';
import styles from './QuestionsListItem.module.css';

interface IProps {
  id?: string;
  index: number;
  removeQuestion: () => void;
}

export const QuestionsListItem = ({ id, index, removeQuestion }: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  return (
    <div
      id={id}
      ref={containerRef}
      className={styles.question}
    >
      <FieldLegend className='flex items-center justify-between'>
        <p className='w-full'>{t('create_page.question.title', { value: index + 1 })}</p>
        <div className='w-fit'>
          <Button
            size='sm'
            onClick={removeQuestion}
            after={<Trash2 className='w-4' />}
          >
            {t('create_page.question.delete')}
          </Button>
        </div>
      </FieldLegend>

      <QuestionGeneralFields index={index} />
      <FieldSeparator />
      <QuestionOptionsList questionIndex={index} />
    </div>
  );
};
