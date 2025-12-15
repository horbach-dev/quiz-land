import { FilePlusCorner } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/components/Button';
import { SectionHeader } from '@/shared/components/SectionHeader';
import { FieldError, FieldSet } from '@/shared/shadcn/ui/field';

import { QuestionsListItem } from '../QuestionsListItem';
import { ScoringAlgorithm } from './components/ScoringAlgorithm';
import { useQuestionsList } from './hooks/useQuestionsList';

export const QuestionsList = () => {
  const { t } = useTranslation();
  const { fields, addQuestion, removeQuestion, error, isSubmitting } = useQuestionsList({
    translate: t,
  });

  return (
    <FieldSet className='mb-5'>
      <SectionHeader
        title={t('create_page.questions.title')}
        description={t('create_page.questions.description')}
      />

      {!fields.length && <ScoringAlgorithm />}

      {fields.map((item, index) => {
        return (
          <QuestionsListItem
            key={item.id}
            id={item.containerId}
            index={index}
            removeQuestion={() => removeQuestion(index)}
          />
        );
      })}

      <Button
        disabled={isSubmitting}
        type='button'
        onClick={addQuestion}
        after={<FilePlusCorner />}
      >
        {/*Добавить вопрос*/}
        {t('create_page.questions.add_question')}
      </Button>

      {error && <FieldError className='text-center'>{error}</FieldError>}
    </FieldSet>
  );
};
