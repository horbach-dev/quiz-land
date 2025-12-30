import { Controller, useFormContext, useWatch } from 'react-hook-form';

import type { IFormData } from '@/features/create-quiz/types';
import { SectionHeader } from '@/shared/components/SectionHeader';
import { Toggle } from '@/shared/components/Toggle';
import { Field, FieldDescription, FieldGroup } from '@/shared/shadcn/ui/field';

import { QuestionCategories } from './components/QuistionCategories';

export const QuizType = () => {
  const { control } = useFormContext<IFormData>();

  const scoringAlgorithm = useWatch({
    name: 'scoringAlgorithm',
    control,
  });

  const questions = useWatch({
    name: 'questions',
    control,
  });

  const isDisabled = !!questions?.length;
  const isPersonalityTest = scoringAlgorithm === 'PERSONALITY_TEST';

  return (
    <>
      <FieldGroup className='mb-5'>
        <SectionHeader
          title={'Тип теста'}
          description={
            'Выберите формат теста — от этого зависит, как будут формироваться вопросы, варианты ответов и результаты прохождения. Тип теста определяет логику оценки и структуру данных.'
          }
        />
        <Controller
          name='scoringAlgorithm'
          defaultValue='STRICT_MATCH'
          control={control}
          render={({ field }) => (
            <div className='relative'>
              {isDisabled && (
                <div className='absolute text-center h-full flex items-center justify-center'>
                  Добавлены вопросы. <br /> Чтобы изменить тип, нужно удалить вопросы и
                  добавить заново.
                </div>
              )}
              <FieldGroup className={isDisabled ? 'opacity-10' : ''}>
                <Field>
                  <Toggle
                    full
                    disabled={isDisabled}
                    active={field.value === 'STRICT_MATCH'}
                    label='Точный ответ (Да / Нет)'
                    onClick={() => field.onChange('STRICT_MATCH')}
                  />
                  <FieldDescription>
                    Пользователь должен выбрать все правильные варианты ответа (и только их),
                    чтобы получить балл. Используется для викторин и экзаменов.
                  </FieldDescription>
                </Field>
                <Field>
                  <Toggle
                    full
                    disabled={isDisabled}
                    active={field.value === 'WEIGHTED_SCALE'}
                    label='Взвешенная шкала (Сумма баллов)'
                    onClick={() => field.onChange('WEIGHTED_SCALE')}
                  />
                  <FieldDescription>
                    Каждый вариант ответа имеет свой вес (например, от 0 до 3 баллов). Баллы за
                    вопросы суммируются для получения итогового результата.
                  </FieldDescription>
                </Field>
                <Field>
                  <Toggle
                    full
                    disabled={isDisabled}
                    active={field.value === 'PERSONALITY_TEST'}
                    label='Оценка по категориям'
                    onClick={() => field.onChange('PERSONALITY_TEST')}
                  />
                  <FieldDescription>
                    Баллы пользователя распределяются между разными категориями (например,
                    Холерик, Сангвиник). Итоговый результат — это категория с наибольшим
                    количеством баллов.
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </div>
          )}
        />
      </FieldGroup>

      {isPersonalityTest && <QuestionCategories />}
    </>
  );
};
