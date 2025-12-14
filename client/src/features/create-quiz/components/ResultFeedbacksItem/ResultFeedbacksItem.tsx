import { Trash2 } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputNumber } from '@/features/create-quiz/components/InputNumber';
import { validationRules } from '@/features/create-quiz/config';
import { validateDescription } from '@/features/create-quiz/utils';
import { Button } from '@/shared/components/Button';
import { TextEditor } from '@/shared/components/TextEditor';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
} from '@/shared/shadcn/ui/field';

import styles from './ResultFeedbacksItem.module.css';
import { useFeedbackItem } from './useFeedbackItem';

interface IProps {
  index: number;
  remove: () => void;
}

export const ResultFeedbacksItem = ({ index, remove }: IProps) => {
  const { t } = useTranslation();
  const { control, register, errors } = useFeedbackItem(index, t);

  const textError = errors?.text?.message;
  const numberError = errors?.from?.message;

  return (
    <div className={styles.container}>
      <FieldLegend className='flex items-center justify-between'>
        <p className='w-full'>
          {t('create_page.result_feedbacks.result_title', { value: index + 1 })}
        </p>
        <div className='w-fit'>
          <Button
            size='sm'
            onClick={remove}
            after={<Trash2 className='w-4' />}
          >
            {t('create_page.question.delete')}
          </Button>
        </div>
      </FieldLegend>

      <FieldDescription>
        Укажите диапазон процентов правильных ответов, который соответствует данному пояснению.
        Например, от 50% до 79%
      </FieldDescription>

      <div className='flex items-center justify-between gap-5'>
        <Field>
          <FieldLabel htmlFor={`result-feedback-from-${index}`}>
            {t('create_page.result_feedbacks.label_from')}
          </FieldLabel>
          <InputNumber
            max={100}
            inputProps={{
              id: `result-feedback-from-${index}`,
              type: 'number',
              ...register(
                `result_feedbacks.${index}.from`,
                validationRules(t).result_feedbacks.number,
              ),
            }}
          />
          <FieldDescription>Максимально: 100</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor={`result-feedback-to-${index}`}>
            {t('create_page.result_feedbacks.label_to')}
          </FieldLabel>
          <InputNumber
            max={100}
            inputProps={{
              id: `result-feedback-to-${index}`,
              type: 'number',
              ...register(
                `result_feedbacks.${index}.to`,
                validationRules(t).result_feedbacks.number,
              ),
            }}
          />
          <FieldDescription>Максимально: 100</FieldDescription>
        </Field>
      </div>

      {numberError && <FieldError>{numberError}</FieldError>}

      <Field>
        <FieldLabel htmlFor={`result-feedback-${index}`}>
          {t('create_page.result_feedbacks.field_title')}
        </FieldLabel>

        <Controller
          name={`result_feedbacks.${index}.text`}
          control={control}
          rules={{ validate: validateDescription({ min: 10, max: 5000 }, t) }}
          render={({ field }) => (
            <TextEditor
              id={`result-feedback-${index}`}
              value={field.value}
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
};
