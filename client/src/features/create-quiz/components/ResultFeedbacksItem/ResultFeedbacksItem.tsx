import { memo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputNumber } from '@/features/create-quiz/components/InputNumber';
import { validationRules } from '@/features/create-quiz/config';
import { validateDescription } from '@/features/create-quiz/utils';
import { TextEditor } from '@/shared/components/TextEditor';
import { ALGORITHMS_WITH_SCORE } from '@/shared/constants';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSeparator,
} from '@/shared/shadcn/ui/field';
import { Input } from '@/shared/shadcn/ui/input.tsx';
import type { TQuizScoringAlgorithm } from '@/shared/types/quiz';

import styles from './ResultFeedbacksItem.module.css';
import { useFeedbackItem } from './useFeedbackItem';
import { ResultCategory } from './сomponents/ResultCategory';
import { ResultFeedbacksItemHeader } from './сomponents/ResultFeedbacksItemHeader';

const descriptions = {
  STRICT_MATCH: 'create_page.result_feedbacks.result_description.strict',
  WEIGHTED_SCALE: 'create_page.result_feedbacks.result_description.weighted',
  PERSONALITY_TEST: 'create_page.result_feedbacks.result_description.personality',
};

const maxScoreValue = 1000;

interface IProps {
  index: number;
  remove: () => void;
  algorithm: TQuizScoringAlgorithm;
  categoryList?: { value: string; label: string }[];
}

export const ResultFeedbacksItem = memo(
  ({ index, remove, algorithm = 'STRICT_MATCH', categoryList }: IProps) => {
    const { t } = useTranslation();
    const { control, register, errors, handleChangeInput } = useFeedbackItem(index, t);

    const textError = errors?.text?.message;
    const titleError = errors?.title?.message;
    const numberError = errors?.from?.message;

    const resultDescription = descriptions[algorithm];

    const isAlgorithmWithScore = ALGORITHMS_WITH_SCORE.includes(algorithm);

    const categoriesCounts = useWatch({ control, name: 'categoriesCounts' });

    return (
      <div className={styles.container}>
        <ResultFeedbacksItemHeader
          description={resultDescription}
          remove={remove}
          index={index}
        />

        <Field>
          <FieldLabel htmlFor={`result-feedback-title-${index}`}>
            Название результата
          </FieldLabel>
          <Input
            id={`result-feedback-title-${index}`}
            placeholder='Введите заголовок...'
            {...register(`results.${index}.title`, {
              required: t('validation.required'),
              minLength: {
                value: 5,
                message: t('validation.min_length', { value: 5 }),
              },
            })}
          />
          {titleError && <FieldError>{titleError}</FieldError>}
        </Field>

        {algorithm === 'PERSONALITY_TEST' && categoryList && (
          <>
            <ResultCategory
              resultIndex={index}
              categoryList={categoryList}
              categoriesCounts={categoriesCounts}
            />
            <FieldSeparator />
          </>
        )}

        {isAlgorithmWithScore && (
          <div className='flex items-center justify-between gap-5'>
            <Field>
              <FieldLabel htmlFor={`result-feedback-from-${index}`}>
                {t('create_page.result_feedbacks.label_from')}
              </FieldLabel>
              <InputNumber
                max={maxScoreValue}
                onInput={handleChangeInput}
                inputProps={{
                  id: `result-feedback-from-${index}`,
                  type: 'number',
                  ...register(`results.${index}.from`, validationRules(t).results.number),
                }}
              />
              <FieldDescription>Максимально: {maxScoreValue}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor={`result-feedback-to-${index}`}>
                {t('create_page.result_feedbacks.label_to')}
              </FieldLabel>
              <InputNumber
                max={maxScoreValue}
                onInput={handleChangeInput}
                inputProps={{
                  id: `result-feedback-to-${index}`,
                  type: 'number',
                  ...register(`results.${index}.to`, validationRules(t).results.number),
                }}
              />
              <FieldDescription>Максимально: {maxScoreValue}</FieldDescription>
            </Field>
          </div>
        )}

        {numberError && <FieldError>{numberError}</FieldError>}

        <Field>
          <FieldLabel htmlFor={`result-feedback-${index}`}>
            {t('create_page.result_feedbacks.field_title')}
          </FieldLabel>

          <Controller
            name={`results.${index}.text`}
            control={control}
            rules={{ validate: validateDescription({ min: 10, max: 5000 }, t) }}
            render={({ field }) => (
              <TextEditor
                id={`result-feedback-${index}`}
                value={field.value as string}
                onChange={field.onChange}
                placeholder={t('create_page.result_feedbacks.field_placeholder')}
              />
            )}
          />
          {textError ? (
            <FieldError>{textError}</FieldError>
          ) : (
            <FieldDescription>{t('validation.min_length', { value: 7 })}</FieldDescription>
          )}
        </Field>
      </div>
    );
  },
);
