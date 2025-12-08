import { useTranslation } from 'react-i18next';

import { UploadImage } from '@/features/create-quiz/components/upload-image';
import { validationRules } from '@/features/create-quiz/config';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/shared/shadcn/ui/field';
import { Textarea } from '@/shared/shadcn/ui/textarea';

export const FormQuestionMain = ({
  index,
  register,
  questionErrors,
  clearErrors,
  setValue,
  setError,
}) => {
  const { t } = useTranslation();
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
        {questionErrors?.text?.message ? (
          <FieldError>{questionErrors?.text?.message}</FieldError>
        ) : (
          <FieldDescription>
            {t('validation.min_length', { value: 7 })}
          </FieldDescription>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor={`question-image-${index}`}>
          {t('create_page.question.image')}
        </FieldLabel>

        <UploadImage
          id={`question-image-${index}`}
          type='question'
          clearError={() => clearErrors(`questions.${index}.image`)}
          setError={(message) =>
            setError(`questions.${index}.image`, { message })
          }
          onChange={(value) => setValue(`questions.${index}.image`, value)}
        />

        {questionErrors?.image?.message ? (
          <FieldError>{questionErrors?.image?.message}</FieldError>
        ) : (
          <FieldDescription>
            {t('create_page.question.image_placeholder')}
          </FieldDescription>
        )}
      </Field>
    </>
  );
};
