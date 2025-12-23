import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { IFormData } from '@/features/create-quiz/types';
import { Button } from '@/shared/components/Button';
import { Toggle } from '@/shared/components/Toggle';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/shadcn/ui/field';
import { Textarea } from '@/shared/shadcn/ui/textarea';
import { usePopupStore } from '@/shared/stores/popupStore';

import noticeExampleImage from './noticeExample.png';

interface IProps {
  isAlgorithmWithScore: boolean;
}

export const ResultFeedbacksGeneral = ({ isAlgorithmWithScore }: IProps) => {
  const openPopup = usePopupStore((state) => state.openPopup);
  const { t } = useTranslation();
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<IFormData>();

  const handleShowNoticeExample = (e) => {

    openPopup('defaultPopup', (close) => ({
      title: 'Пример отображения главной заметки теста',
      render: (
        <>
          <img
            className='rounded-[1rem] mb-[1rem] aspect-[1/1.56]'
            src={noticeExampleImage}
            alt='notice example'
          />
          <Button onClick={close}>Понятно</Button>
        </>
      ),
    }));

    e.preventDefault();
  };

  return (
    <FieldGroup>
      {isAlgorithmWithScore && (
        <Field>
          <Controller
            name='resultPositive'
            defaultValue={true}
            control={control}
            render={({ field }) => (
              <Toggle
                full
                active={field.value}
                label='Тест является позитивным'
                onClick={() => field.onChange(!field.value)}
              />
            )}
          />
          <FieldDescription>
            Чем выше балл, тем лучше результат (например, тест на IQ, уровень знаний).
          </FieldDescription>
        </Field>
      )}

      <Field>
        <FieldLabel htmlFor='quiz-notice'>
          {t('create_page.result_feedbacks.notice_label')}
          <span
            className='text-blue-300 font-bold underline'
            onClick={handleShowNoticeExample}
          >
            см. пример
          </span>
        </FieldLabel>
        <Textarea
          id='quiz-notice'
          placeholder={t('create_page.result_feedbacks.notice_placeholder')}
          {...register('resultNotice')}
        />
        {errors.resultNotice?.message ? (
          <FieldError>{errors.resultNotice.message}</FieldError>
        ) : (
          <FieldDescription>Заметка отображается перед текстом результата</FieldDescription>
        )}
      </Field>
    </FieldGroup>
  );
};
