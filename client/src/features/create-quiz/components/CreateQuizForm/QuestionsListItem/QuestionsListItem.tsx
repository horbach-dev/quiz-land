import { Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UploadImage } from '@/features/create-quiz/components/upload-image';
import { validationRules } from '@/features/create-quiz/config';
import type { IFormData } from '@/features/create-quiz/types';
import { Button } from '@/shared/components/Button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
} from '@/shared/shadcn/ui/field';
import { Textarea } from '@/shared/shadcn/ui/textarea';

import { QuestionOptionsList } from '../QuestionOptionsList';
import styles from './QuestionsListItem.module.css';

interface IProps {
  index: number;
  removeQuestion: () => void;
}

export const QuestionsListItem = ({ index, removeQuestion }: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
  const isEdit = watch(`isEdit`);
  const questionErrors = errors?.questions?.[index];
  const textError = questionErrors?.text?.message;
  const imageError = questionErrors?.image?.message;

  useEffect(() => {
    // if (isEdit) return;

    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [isEdit]);

  return (
    <div ref={containerRef} className={styles.question}>
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

      <QuestionOptionsList questionIndex={index} />
    </div>
  );
};
