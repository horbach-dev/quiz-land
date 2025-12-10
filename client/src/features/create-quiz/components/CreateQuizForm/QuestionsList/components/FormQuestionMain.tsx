import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UploadImage } from '@/features/create-quiz/components/upload-image';
import { validationRules } from '@/features/create-quiz/config';
import type { IFormData } from '@/features/create-quiz/types.ts';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/shared/shadcn/ui/field';
import { Textarea } from '@/shared/shadcn/ui/textarea';

export const FormQuestionMain = ({ index }) => {
  const { t } = useTranslation();
  const {
    control,
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<IFormData>();

  const loadedImg = watch(`questions.${index}.loadedImg`);
  const questionErrors = errors?.questions?.[index];
  const textError = questionErrors?.text?.message;
  const imageError = questionErrors?.image?.message;

  return (
    <>
      <Field>
        <FieldLabel htmlFor={`question-text-${index}`}>
          {t('create_page.question.field_title')}
        </FieldLabel>
        <Textarea
          id={`question-text-${index}`}
          placeholder={t('create_page.question.field_placeholder')}
          {...register(`questions.${index}.text`, validationRules(t).question)}
        />
        {textError ? (
          <FieldError>{textError}</FieldError>
        ) : (
          <FieldDescription>{t('validation.min_length', { value: 7 })}</FieldDescription>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor={`question-image-${index}`}>
          {t('create_page.question.image')}
        </FieldLabel>

        <Controller
          name={`questions.${index}.image`}
          control={control}
          render={({ field }) => (
            <UploadImage
              id={`question-image-${index}`}
              type='question'
              loadedImg={loadedImg}
              clearError={() => clearErrors(`questions.${index}.image`)}
              setError={(message) => setError(`questions.${index}.image`, { message })}
              onChange={field.onChange}
            />
          )}
        />

        {imageError ? (
          <FieldError>{imageError}</FieldError>
        ) : (
          <FieldDescription>{t('create_page.question.image_placeholder')}</FieldDescription>
        )}
      </Field>
    </>
  );
};
