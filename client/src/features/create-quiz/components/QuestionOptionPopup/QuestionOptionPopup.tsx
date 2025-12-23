import { useDeferredValue } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UploadImage } from '@/features/create-quiz/components/UploadImage';
import type { IFormData } from '@/features/create-quiz/types';
import { Button } from '@/shared/components/Button';
import { InputNumber } from '@/shared/components/InputNumber';
import { Popup } from '@/shared/components/Popup';
import { Select } from '@/shared/components/Select';
import { Toggle } from '@/shared/components/Toggle';
import { FieldError, FieldLabel } from '@/shared/shadcn/ui/field';
import { Textarea } from '@/shared/shadcn/ui/textarea';

import styles from './QuestionOptionPopup.module.css';

export const QuestionOptionPopup = () => {
  const { t } = useTranslation();
  const {
    control,
    register,
    clearErrors,
    setError,
    setValue,
    formState: { errors },
  } = useFormContext<IFormData>();

  const {
    isOpen,
    optionIndex = 0,
    questionIndex = 0,
  } = useWatch({
    control,
    name: 'optionPopup',
    defaultValue: {
      isOpen: false,
      optionIndex: 0,
      questionIndex: 0,
    },
  });

  const scoringAlgorithm = useWatch({ control, name: 'scoringAlgorithm' });
  const optionType = useWatch({ control, name: `questions.${questionIndex as number}.field` });
  const questionCategories = useWatch({ control, name: 'questionCategories' });

  const categories = useDeferredValue(questionCategories);

  const imageError =
    errors?.questions?.[questionIndex]?.options?.[optionIndex]?.image?.message;

  const onClose = () => {
    setValue('optionPopup', { isOpen: false, optionIndex, questionIndex });
  };

  if (!isOpen) return null;

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={styles.popup}>
        <div className={styles.header}>
          <FieldLabel
            className={styles.label}
            htmlFor={`option-field-${optionIndex}`}
          >
            {t('create_page.options.title', { value: optionIndex + 1 })}
          </FieldLabel>

          {scoringAlgorithm === 'WEIGHTED_SCALE' && (
            <div className={styles.weight}>
              <span>Балл</span>
              <InputNumber
                max={100}
                inputProps={{
                  ...register(`questions.${questionIndex}.options.${optionIndex}.weight`),
                }}
              />
            </div>
          )}

          {scoringAlgorithm === 'STRICT_MATCH' && (
            <Controller
              name={`questions.${questionIndex}.options.${optionIndex}.isCorrect`}
              control={control}
              render={({ field }) => (
                <Toggle
                  active={field.value}
                  onClick={() => field.onChange(!field.value)}
                  label={t('create_page.options.right')}
                />
              )}
            />
          )}

          {scoringAlgorithm === 'PERSONALITY_TEST' && categories && (
            <Controller
              name={`questions.${questionIndex}.options.${optionIndex}.category`}
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value as string}
                  onChange={field.onChange}
                  options={categories.map((category) => ({
                    label: category.text,
                    value: category.id,
                  }))}
                />
              )}
            />
          )}
        </div>

        {optionType === 'TEXT' && (
          <Textarea
            id={`option-field-${optionIndex}`}
            placeholder={t('create_page.options.placeholder')}
            {...register(`questions.${questionIndex}.options.${optionIndex}.text`)}
          />
        )}

        {optionType === 'IMAGE' && (
          <Controller
            name={`questions.${questionIndex}.options.${optionIndex}.image`}
            control={control}
            render={({ field }) => (
              <UploadImage
                id={`option-field-${optionIndex}`}
                type='question'
                clearError={() =>
                  clearErrors(`questions.${questionIndex}.options.${optionIndex}.image`)
                }
                setError={(message) =>
                  setError(`questions.${questionIndex}.options.${optionIndex}.image`, {
                    message,
                  })
                }
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
        )}

        {imageError && <FieldError>{imageError}</FieldError>}
        <Button
          type='button'
          className={styles.button}
          onClick={onClose}
        >
          Применить
        </Button>
      </div>
    </Popup>
  );
};
