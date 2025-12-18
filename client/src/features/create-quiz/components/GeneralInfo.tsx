import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { validationRules } from '@/features/create-quiz/config';
import type { IFormData } from '@/features/create-quiz/types';
import { validateDescription } from '@/features/create-quiz/utils.ts';
import { TextEditor } from '@/shared/components/TextEditor';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/shared/shadcn/ui/field';
import { Textarea } from '@/shared/shadcn/ui/textarea.tsx';

import { UploadImage } from './UploadImage';

export const GeneralInfo = () => {
  const { t } = useTranslation();
  const {
    control,
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<IFormData>();

  const loadedImg = watch('loadedImg');

  return (
    <FieldSet className='mb-5'>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='quiz-title'>{t('create_page.main.title')}</FieldLabel>
          <Textarea
            id='quiz-title'
            placeholder={t('create_page.main.title_placeholder')}
            {...register('title', validationRules(t).title)}
          />
          {errors.title?.message ? (
            <FieldError>{errors.title.message}</FieldError>
          ) : (
            <FieldDescription>{validationRules(t).title.minLength.message}</FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel>{t('create_page.main.description')}</FieldLabel>
          <Controller
            name='description'
            control={control}
            rules={{ validate: validateDescription({ min: 10, max: 5000 }, t) }}
            render={({ field }) => (
              <TextEditor
                id='quiz-description'
                value={field.value}
                onChange={field.onChange}
                placeholder={t('create_page.main.description_placeholder')}
              />
            )}
          />
          {errors.description?.message ? (
            <FieldError>{errors.description?.message}</FieldError>
          ) : (
            <FieldDescription>
              {validationRules(t).description.minLength.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor='quiz-poster'>{t('create_page.main.poster')}</FieldLabel>

          <Controller
            name='poster'
            control={control}
            rules={{ required: t('validation.required') }}
            render={({ field }) => (
              <UploadImage
                id='quiz-poster'
                type='poster'
                loadedImg={loadedImg}
                clearError={() => clearErrors('poster')}
                setError={(message) => setError('poster', { message })}
                onChange={field.onChange}
              />
            )}
          />

          {errors.poster?.message ? (
            <FieldError>{errors.poster?.message}</FieldError>
          ) : (
            <FieldDescription>{t('create_page.main.poster_placeholder')}</FieldDescription>
          )}
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};
