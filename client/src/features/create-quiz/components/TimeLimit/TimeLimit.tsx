import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputNumber } from '@/features/create-quiz/components/InputNumber';
import { validationRules } from '@/features/create-quiz/config';
import type { IFormData } from '@/features/create-quiz/types';
import { SectionHeader } from '@/shared/components/SectionHeader';
import { Time } from '@/shared/components/Time';
import { Toggle } from '@/shared/components/Toggle';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from '@/shared/shadcn/ui/field';

import styles from './TimeLimit.module.css';

export const TimeLimit = () => {
  const { t } = useTranslation();
  const {
    watch,
    control,
    register,
    setValue,
    formState: { errors, defaultValues },
  } = useFormContext<IFormData>();

  const [isActive, setActive] = useState<boolean>(!!defaultValues?.timeLimit);

  const value = watch('timeLimit');

  useEffect(() => {
    if (!isActive && value) {
      setValue(`timeLimit`, 0);
      setValue(`timeLimitChoice`, false);
    }
  }, [value, isActive, setValue]);

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
                  ...register('timeLimit', validationRules(t).time_limit),
                }}
              />
              <Time
                className={styles.time}
                seconds={value ? value * 60 : 0}
              />
            </div>

            {errors.timeLimit?.message ? (
              <FieldError>{errors.timeLimit.message}</FieldError>
            ) : (
              <FieldDescription>{validationRules(t).time_limit.max.message}</FieldDescription>
            )}
          </Field>
          <Field>
            <FieldDescription>
              {t('create_page.time_limit.choice_description')}
            </FieldDescription>
            <Controller
              name='timeLimitChoice'
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Toggle
                  active={field.value as boolean}
                  label={t('create_page.time_limit.choice_label')}
                  onClick={() => field.onChange(!field.value)}
                />
              )}
            />
          </Field>
        </>
      )}
    </FieldSet>
  );
};
