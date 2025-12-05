import type {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
import { Textarea } from '@/shared/shadcn/ui/textarea';

import { validationRules } from '../../config';
import type { IFormData } from '../../types';
import { UploadImage } from '../upload-image';

interface IProps {
  register: UseFormRegister<IFormData>;
  errors: FieldErrors<IFormData>;
  setError: UseFormSetError<IFormData>;
  clearErrors: UseFormClearErrors<IFormData>;
  setValue: UseFormSetValue<IFormData>;
}

export const CreateQuizMain = ({
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
            {t('create_page.form.title')}
          </FieldLabel>
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
          <FieldLabel htmlFor='quiz-description'>
            {t('create_page.form.description')}
          </FieldLabel>
          <Textarea
            id='quiz-description'
            placeholder={t('create_page.form.description_placeholder')}
            className='resize-none'
            {...register('description', validationRules.description)}
          />
          {errors.description?.message ? (
            <FieldError>{errors.description?.message}</FieldError>
          ) : (
            <FieldDescription>
              Минимум 100 символов, максимум 10000
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor='quiz-poster'>
            {'Постер квиза (главное изображение)'}
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
              {'Максимум 1мб, разрешен файл PNG, JPEG'}
            </FieldDescription>
          )}
        </Field>

        <FieldSeparator />
      </FieldGroup>
    </FieldSet>
  );
};
