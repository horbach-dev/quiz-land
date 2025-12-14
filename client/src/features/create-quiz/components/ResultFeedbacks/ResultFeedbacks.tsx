import { FilePlusCorner } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { IFormData } from '@/features/create-quiz/types';
import { Button } from '@/shared/components/Button';
import { SectionHeader } from '@/shared/components/SectionHeader';
import { FieldSeparator, FieldSet } from '@/shared/shadcn/ui/field';

import { ResultFeedbacksItem } from '../ResultFeedbacksItem';
import { ResultFeedbacksError } from './ResultFeedbacksError';

export const ResultFeedbacks = () => {
  const { t } = useTranslation();
  const {
    control,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useFormContext<IFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'result_feedbacks',
  });

  const handleAddResult = () => {
    append({
      text: '',
      from: 0,
      to: 100,
    });
  };

  return (
    <FieldSet className='mb-5'>
      <FieldSeparator />
      <SectionHeader
        title={t('create_page.result_feedbacks.title')}
        description={t('create_page.result_feedbacks.description')}
      />
      {fields.map((field, i) => (
        <ResultFeedbacksItem
          key={field.id}
          index={i}
          remove={() => remove(i)}
        />
      ))}

      <ResultFeedbacksError
        error={errors?.result_feedbacks?.message}
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
