import { Trash2 } from 'lucide-react';
import type {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import { Toggle } from '@/shared/components/Toggle';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/shared/shadcn/ui/field';
import { Input } from '@/shared/shadcn/ui/input.tsx';

import type { IFormData } from '../../types';

interface IProps {
  answers: FieldArrayWithId<IFormData, `questions.${number}.options`, 'id'>[];
  errors: any[];
  setValue: UseFormSetValue<IFormData>;
  questionIndex: number;
  removeAnswer: UseFieldArrayRemove;
  register: UseFormRegister<IFormData>;
  watch: UseFormWatch<IFormData>;
}
function findCorrectIndex(options) {
  return options.findIndex((v) => v.isCorrect);
}

export const AnswerFields = ({
  answers,
  questionIndex,
  removeAnswer,
  errors,
  setValue,
  register,
  watch,
}: IProps) => {
  const setCorrectAnswer = (selectedIndex: number) => {
    answers.forEach((_, index) => {
      setValue(`questions.${questionIndex}.options.${index}.isCorrect`, false, {
        shouldDirty: true,
      });
    });

    setValue(`questions.${questionIndex}.options.${selectedIndex}.isCorrect`, true, {
      shouldDirty: true,
    });
  };

  const optionsForQuestion = watch(`questions.${questionIndex}.options`);
  const correctIndex = findCorrectIndex(optionsForQuestion);

  return answers.map((answer, index) => {
    const answerErrors = errors[index];

    return (
      <Field key={answer.id} className='relative'>
        <FieldLabel htmlFor={`answer-text-${index}`}>Ответ {index + 1}</FieldLabel>
        <div className='flex items-center gap-[1rem]'>
          <Input
            id={`answer-text-${index}`}
            placeholder={'Введите ответ...'}
            {...register(`questions.${questionIndex}.options.${index}.text`, {
              required: 'Обязательное поле',
              min: 'Минимальное кол-во символов 1',
              max: 'Максимальное кол-во символов 50',
              minLength: 1,
              maxLength: 50,
            })}
          />
          <Trash2
            onClick={() => removeAnswer(index)}
            className='relative w-[1.5rem] h-[1.5rem] r-0'
          />
        </div>
        {answerErrors?.text?.message ? (
          <FieldError>{answerErrors?.text?.message}</FieldError>
        ) : (
          <FieldDescription>Минимум 1 символ</FieldDescription>
        )}
        <Toggle
          active={correctIndex === index}
          onClick={() => setCorrectAnswer(index)}
          label='Правильный вариант'
        />
        <input
          type='hidden'
          {...register(`questions.${questionIndex}.options.${index}.isCorrect`)}
        />
      </Field>
    );
  });
};
