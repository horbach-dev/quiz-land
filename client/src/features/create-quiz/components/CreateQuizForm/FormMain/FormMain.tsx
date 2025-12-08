import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormClearErrors,
  type UseFormRegister,
  type UseFormSetError,
  type UseFormSetValue,
} from 'react-hook-form';
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
  FieldSeparator,
  FieldSet,
} from '@/shared/shadcn/ui/field';
import { Input } from '@/shared/shadcn/ui/input';

import { UploadImage } from '../../upload-image';

interface IProps {
  control: Control<IFormData>;
  register: UseFormRegister<IFormData>;
  errors: FieldErrors<IFormData>;
  setError: UseFormSetError<IFormData>;
  clearErrors: UseFormClearErrors<IFormData>;
  setValue: UseFormSetValue<IFormData>;
}

export const FormMain = ({
  control,
  register,
  errors,
  setError,
  clearErrors,
  setValue,
}: IProps) => {
  const { t } = useTranslation();
  return (
    <FieldSet className='mb-5'>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='quiz-title'>
            {t('create_page.main.title')}
          </FieldLabel>
          <Input
            id='quiz-title'
            placeholder={t('create_page.main.title_placeholder')}
            {...register('title', validationRules(t).title)}
          />
          {errors.title?.message ? (
            <FieldError>{errors.title.message}</FieldError>
          ) : (
            <FieldDescription>
              {validationRules(t).title.minLength.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel>{t('create_page.main.description')}</FieldLabel>
          <Controller
            name='description'
            control={control}
            rules={{ validate: validateDescription }}
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
          <FieldLabel htmlFor='quiz-poster'>
            {t('create_page.main.poster')}
          </FieldLabel>

          <UploadImage
            id='quiz-poster'
            type='poster'
            clearError={() => clearErrors('poster')}
            setError={(message) => setError('poster', { message })}
            onChange={(value) => setValue('poster', value)}
          />

          {errors.poster?.message ? (
            <FieldError>{errors.poster?.message}</FieldError>
          ) : (
            <FieldDescription>
              {t('create_page.main.poster_placeholder')}
            </FieldDescription>
          )}
        </Field>

        <FieldSeparator />
      </FieldGroup>
    </FieldSet>
  );
};
