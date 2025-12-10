import { Trash2 } from 'lucide-react';
import {
  type Control,
  Controller,
  type UseFormClearErrors,
  type UseFormRegister,
  type UseFormSetError, useWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UploadImage } from '@/features/create-quiz/components/upload-image';
import { validationRules } from '@/features/create-quiz/config';
import type { IFormData } from '@/features/create-quiz/types.ts';
import { Button } from '@/shared/components/Button';
import { Toggle } from '@/shared/components/Toggle';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/shared/shadcn/ui/field.tsx';
import { Textarea } from '@/shared/shadcn/ui/textarea';

import styles from './FormQuestionOptionsItem.module.css';

interface IProps {
  index: number;
  isImage: boolean;
  isCorrect: boolean;
  questionIndex: number;
  remove: () => void;
  setCorrectOption: () => void;
  textError?: string | null;
  imageError?: string | null;
  register: UseFormRegister<IFormData>;
  control: Control<IFormData>;
  setError: UseFormSetError<IFormData>;
  clearErrors: UseFormClearErrors<IFormData>;
}

export const FormQuestionOptionsItem = ({
  index,
  questionIndex,
  remove,
  register,
  control,
  setError,
  clearErrors,
  isCorrect,
  textError,
  imageError,
  setCorrectOption,
}: IProps) => {
  const { t } = useTranslation();

  const loadedImg = useWatch({
    name: `questions.${questionIndex}.options.${index}.loadedImg`,
  });

  const fieldType = useWatch({
    name: `questions.${questionIndex}.options.${index}.field`,
  });

  const imageFieldName =
    `questions.${questionIndex}.options.${index}.image` as const;

  return (
    <Field className={styles.container}>
      <div className={styles.header}>
        <FieldLabel htmlFor={`answer-text-${index}`}>
          {t('create_page.options.title', { value: index + 1 })}
        </FieldLabel>
        <Toggle
          active={isCorrect}
          onClick={setCorrectOption}
          label={t('create_page.options.right')}
        />
        <Button
          style='icon'
          size='sm'
          onClick={remove}
        >
          <Trash2 />
        </Button>
      </div>
      {fieldType === 'image' ? (
        <>
          <Controller
            name={imageFieldName}
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }) => (
              <UploadImage
                id={`quiz-question-option-${index}`}
                type='poster'
                loadedImg={loadedImg}
                clearError={() => clearErrors(imageFieldName)}
                setError={(message) => setError(imageFieldName, { message })}
                onChange={field.onChange}
              />
            )}
          />
          {imageError ? (
            <FieldError>{imageError}</FieldError>
          ) : (
            <FieldDescription>
              {t('validation.min_length', { value: 1 })}
            </FieldDescription>
          )}
        </>
      ) : (
        <>
          <Textarea
            id={`answer-text-${index}`}
            placeholder={t('create_page.options.placeholder')}
            {...register(
              `questions.${questionIndex}.options.${index}.text`,
              validationRules(t).option,
            )}
          />
          {textError ? (
            <FieldError>{textError}</FieldError>
          ) : (
            <FieldDescription>
              {t('validation.min_length', { value: 1 })}
            </FieldDescription>
          )}
        </>
      )}
    </Field>
  );
};
