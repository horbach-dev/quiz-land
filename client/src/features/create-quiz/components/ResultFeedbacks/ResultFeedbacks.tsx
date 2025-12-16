import { FilePlusCorner } from 'lucide-react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { IFormData } from '@/features/create-quiz/types';
import { Button } from '@/shared/components/Button';
import { SectionHeader } from '@/shared/components/SectionHeader';
import { Toggle } from '@/shared/components/Toggle';
import {
  Field,
  FieldDescription,
  FieldError, FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from '@/shared/shadcn/ui/field';
import { Textarea } from '@/shared/shadcn/ui/textarea.tsx';

import { ResultFeedbacksItem } from '../ResultFeedbacksItem';
import { ResultFeedbacksError } from './ResultFeedbacksError';

const descriptions = {
  STRICT_MATCH: 'create_page.result_feedbacks.description.strict',
  WEIGHTED_SCALE: 'create_page.result_feedbacks.description.weighted',
  PERSONALITY_TEST: 'create_page.result_feedbacks.description.personality',
};

const showPositiveToggleFor = ['STRICT_MATCH', 'WEIGHTED_SCALE'];

export const ResultFeedbacks = () => {
  const { t } = useTranslation();
  const {
    control,
    setError,
    clearErrors,
    getValues,
    register,
    watch,
    formState: { isSubmitting, errors },
  } = useFormContext<IFormData>();

  const { fields, append, remove } = useFieldArray({ control, name: 'resultFeedbacks' });

  const algorithm = watch('scoringAlgorithm') || 'STRICT_MATCH';

  const handleAddResult = () => {
    const prevToValue = getValues(`resultFeedbacks.${fields.length - 1}.to`);
    const from = prevToValue ? Number(prevToValue) + 1 : 0;

    if (algorithm === 'STRICT_MATCH') {
      append({ text: '', from, to: from + 1 });
    }

    if (algorithm === 'WEIGHTED_SCALE') {
      append({ text: '', from, to: from + 1 });
    }
  };

  const isShowPositiveToggle = showPositiveToggleFor.includes(algorithm);

  return (
    <FieldSet className='mb-5'>
      <FieldSeparator />
      <SectionHeader
        title={t('create_page.result_feedbacks.title')}
        description={t(descriptions[algorithm])}
      />

      <FieldGroup>
        {isShowPositiveToggle && (
          <Field>
            <Controller
              name='positiveScore'
              defaultValue={true}
              control={control}
              render={({ field }) => (
                <Toggle
                  full
                  active={field.value}
                  label='Тест является позитивным'
                  onClick={() => field.onChange(!field.value)}
                />
              )}
            />
            <FieldDescription>
              Чем выше балл, тем лучше результат (например, тест на IQ, уровень знаний).
            </FieldDescription>
          </Field>
        )}

        <Field>
          <FieldLabel htmlFor='quiz-notice'>
            {t('create_page.result_feedbacks.notice_label')}
          </FieldLabel>
          <Textarea
            id='quiz-notice'
            placeholder={t('create_page.result_feedbacks.notice_placeholder')}
            {...register('feedbackNotice')}
          />
          {errors.feedbackNotice?.message ? (
            <FieldError>{errors.feedbackNotice.message}</FieldError>
          ) : (
            <FieldDescription>Заметка отображается перед текстом результата</FieldDescription>
          )}
        </Field>
      </FieldGroup>

      {fields.map((field, i) => (
        <ResultFeedbacksItem
          key={field.id}
          index={i}
          algorithm={algorithm}
          remove={() => remove(i)}
        />
      ))}

      <ResultFeedbacksError
        error={errors?.resultFeedbacks?.message}
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
