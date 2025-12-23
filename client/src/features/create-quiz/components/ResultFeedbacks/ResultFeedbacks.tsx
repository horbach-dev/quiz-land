import { FilePlusCorner } from 'lucide-react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { IFormData } from '@/features/create-quiz/types';
import { Button } from '@/shared/components/Button';
import { SectionHeader } from '@/shared/components/SectionHeader';
import { ALGORITHMS_WITH_SCORE } from '@/shared/constants';
import { FieldSet } from '@/shared/shadcn/ui/field';

import { ResultFeedbacksItem } from '../ResultFeedbacksItem';
import { ResultFeedbacksGeneral } from './components/ResultFeedbacksGeneral';
import { ResultFeedbacksError } from './ResultFeedbacksError';

const descriptions = {
  STRICT_MATCH: 'create_page.result_feedbacks.description.strict',
  WEIGHTED_SCALE: 'create_page.result_feedbacks.description.weighted',
  PERSONALITY_TEST: 'create_page.result_feedbacks.description.personality',
};

export const ResultFeedbacks = () => {
  const { t } = useTranslation();
  const {
    control,
    setError,
    clearErrors,
    getValues,
    formState: { isSubmitting, errors },
  } = useFormContext<IFormData>();

  const { fields, append, remove } = useFieldArray({ control, name: 'results' });

  const algorithm = useWatch({ control, name: 'scoringAlgorithm' }) || 'STRICT_MATCH';
  const questionCategories = useWatch({ control, name: 'questionCategories' });

  const isAlgorithmWithScore = ALGORITHMS_WITH_SCORE.includes(algorithm);

  const handleAddResult = () => {
    if (isAlgorithmWithScore) {
      const prevToValue = getValues(`results.${fields.length - 1}.to`);
      const from = prevToValue ? Number(prevToValue) + 1 : 0;

      append({ text: '', from, to: from + 1 });
      return;
    }

    append({ text: '' });
  };

  const categoryList = questionCategories?.map((category) => ({
    label: category.text,
    value: category.id,
  }));

  return (
    <FieldSet className='mb-5'>
      <SectionHeader
        title={t('create_page.result_feedbacks.title')}
        description={t(descriptions[algorithm])}
      />

      <ResultFeedbacksGeneral isAlgorithmWithScore={isAlgorithmWithScore} />

      {fields.map((field, i) => (
        <ResultFeedbacksItem
          key={field.id}
          index={i}
          algorithm={algorithm}
          categoryList={categoryList}
          remove={() => remove(i)}
        />
      ))}

      <ResultFeedbacksError
        error={errors?.results?.message}
        setError={setError}
        clearErrors={clearErrors}
      />

      <Button
        disabled={isSubmitting}
        type='button'
        onClick={handleAddResult}
        after={<FilePlusCorner />}
      >
        {/*Добавить вопрос*/}
        {t('create_page.result_feedbacks.add')}
      </Button>
    </FieldSet>
  );
};
