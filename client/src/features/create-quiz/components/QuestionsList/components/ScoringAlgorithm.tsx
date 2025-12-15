import { Controller, useFormContext } from 'react-hook-form';

import type { IFormData } from '@/features/create-quiz/types';
import { Toggle } from '@/shared/components/Toggle';
import { Field, FieldDescription, FieldGroup } from '@/shared/shadcn/ui/field';

export const ScoringAlgorithm = () => {
  const { control } = useFormContext<IFormData>();

  return (
    <FieldGroup className='mb-5'>
      <Field>
        <Controller
          name='scoringAlgorithm'
          defaultValue='STRICT_MATCH'
          control={control}
          render={({ field }) => (
            <Toggle
              full
              active={field.value === 'STRICT_MATCH'}
              label='Точный ответ (Да / Нет)'
              onClick={() => field.onChange('STRICT_MATCH')}
            />
          )}
        />
        <FieldDescription>
          Пользователь должен выбрать все правильные варианты ответа (и только их), чтобы
          получить балл. Используется для викторин и экзаменов.
        </FieldDescription>
      </Field>
      <Field>
        <Controller
          name='scoringAlgorithm'
          control={control}
          render={({ field }) => (
            <Toggle
              full
              active={field.value === 'WEIGHTED_SCALE'}
              label='Взвешенная шкала (Сумма баллов)'
              onClick={() => field.onChange('WEIGHTED_SCALE')}
            />
          )}
        />
        <FieldDescription>
          Каждый вариант ответа имеет свой вес (например, от 0 до 3 баллов). Баллы за все
          вопросы суммируются для получения итогового результата (например, для измерения
          уровня).
        </FieldDescription>
      </Field>
      {/*<Field>*/}
      {/*  <Controller*/}
      {/*    name='scoringAlgorithm'*/}
      {/*    control={control}*/}
      {/*    render={({ field }) => (*/}
      {/*      <Toggle*/}
      {/*        full*/}
      {/*        active={field.value === 'PERSONALITY_TEST'}*/}
      {/*        label='Оценка по категориям'*/}
      {/*        onClick={() => field.onChange('PERSONALITY_TEST')}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  />*/}
      {/*  <FieldDescription>*/}
      {/*    Баллы пользователя распределяются между разными категориями (например, Холерик,*/}
      {/*    Сангвиник). Итоговый результат — это категория с наибольшим количеством баллов.*/}
      {/*  </FieldDescription>*/}
      {/*</Field>*/}
    </FieldGroup>
  );
};
