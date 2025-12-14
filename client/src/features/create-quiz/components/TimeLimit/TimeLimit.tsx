import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputNumber } from '@/features/create-quiz/components/InputNumber.tsx';
import { validationRules } from '@/features/create-quiz/config';
import type { IFormData } from '@/features/create-quiz/types';
import { SectionHeader } from '@/shared/components/SectionHeader';
import { Toggle } from '@/shared/components/Toggle';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from '@/shared/shadcn/ui/field';

import styles from './TimeLimit.module.css';

const getHoursLabel = (value: number) => {
  if (value > 4) return 'часов';
  if (value > 1) return 'часа';
  return 'час';
};

const getMinutesLabel = (value: number) => {
  if (value > 4) return 'минут';
  if (value > 1) return 'минуты';
  return 'минута';
};

export const TimeLimit = () => {
  const [isActive, setActive] = useState<boolean>(false);
  const { t } = useTranslation();
  const {
    watch,
    control,
    register,
    formState: { errors },
  } = useFormContext<IFormData>();

  const value = watch('time_limit');

  const hours = Math.floor(value / 60);
  const mins = Math.floor(value % 60);

  return (
    <FieldSet>
      <SectionHeader
        title={t('create_page.time_limit.title')}
        description={t('create_page.time_limit.description')}
      />
      <Toggle
        active={isActive}
        label={t('create_page.time_limit.toggle_label')}
        onClick={() => setActive(!isActive)}
      />
      {isActive && (
        <>
          <Field>
            <FieldLabel htmlFor='time-limit'>
              {t('create_page.time_limit.input_label')}
            </FieldLabel>
            <div className={styles.input}>
              <InputNumber
                inputProps={{
                  id: 'time-limit',
                  type: 'number',
                  ...register('time_limit', validationRules(t).time_limit),
                }}
              />
              <div className={styles.time}>
                {!!hours && (
                  <span className={styles.timeHour}>
                    {hours} {getHoursLabel(hours)}
                  </span>
                )}
                {!!mins && (
                  <span>
                    {mins} {getMinutesLabel(mins)}
                  </span>
                )}
              </div>
            </div>

            {errors.time_limit?.message ? (
              <FieldError>{errors.time_limit.message}</FieldError>
            ) : (
              <FieldDescription>{validationRules(t).time_limit.max.message}</FieldDescription>
            )}
          </Field>
          <Field>
            <FieldDescription>
              {t('create_page.time_limit.choice_description')}
            </FieldDescription>
            <Controller
              name='time_limit_choice'
              control={control}
              render={({ field }) => (
                <Toggle
                  active={field.value}
                  label={t('create_page.time_limit.choice_label')}
                  onClick={() => field.onChange(!field.value)}
                />
              )}
            />
          </Field>
        </>
      )}
      <FieldSeparator className='mb-4' />
    </FieldSet>
  );
};
