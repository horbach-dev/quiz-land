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

import { validationRules } from '../../config';
import type { IFormData } from '../../types';
import { UploadImage } from '../upload-image';

interface IProps {
  control: Control<IFormData>;
  register: UseFormRegister<IFormData>;
  errors: FieldErrors<IFormData>;
  setError: UseFormSetError<IFormData>;
  clearErrors: UseFormClearErrors<IFormData>;
  setValue: UseFormSetValue<IFormData>;
}

export const CreateQuizMain = ({
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
          <FieldLabel htmlFor='quiz-title'>{t('create_page.form.title')}</FieldLabel>
          <Input
            id='quiz-title'
            placeholder={t('create_page.form.title_placeholder')}
            {...register('title', validationRules.title)}
          />
          {errors.title?.message ? (
            <FieldError>{errors.title.message}</FieldError>
          ) : (
            <FieldDescription>Минимум 7 символов</FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel>{t('create_page.form.description')}</FieldLabel>
          <Controller
            name='description'
            control={control}
            rules={{ validate: validateDescription }}
            render={({ field }) => (
              <TextEditor
                id='quiz-description'
                value={field.value}
                onChange={field.onChange}
                placeholder={t('create_page.form.description_placeholder')}
              />
            )}
          />
          {errors.description?.message ? (
            <FieldError>{errors.description?.message}</FieldError>
          ) : (
            <FieldDescription>Минимум 100 символов, максимум 10000</FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor='quiz-poster'>{'Постер квиза (главное изображение)'}</FieldLabel>

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
            <FieldDescription>{'Максимум 1мб, разрешен файл PNG, JPEG'}</FieldDescription>
          )}
        </Field>

        <FieldSeparator />
      </FieldGroup>
    </FieldSet>
  );
};
