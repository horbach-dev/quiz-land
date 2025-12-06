import { ListCheck, Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import {
  type Control,
  type FieldErrors,
  useFieldArray,
  type UseFormClearErrors,
  type UseFormRegister,
  type UseFormSetError,
  type UseFormSetValue,
  type UseFormWatch,
} from 'react-hook-form';

import { validationRules } from '@/features/create-quiz/config';
import { UploadImage } from '@/features/create-quiz/ui/upload-image';
import { Button } from '@/shared/components/Button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
} from '@/shared/shadcn/ui/field';
import { Input } from '@/shared/shadcn/ui/input';

import type { IFormData } from '../../types';
import { AnswerFields } from './answer-fields';

interface QuestionProps {
  questionIndex: number;
  control: Control<IFormData>;
  register: UseFormRegister<IFormData>;
  errors: FieldErrors<IFormData>;
  setValue: UseFormSetValue<IFormData>;
  setError: UseFormSetError<IFormData>;
  clearErrors: UseFormClearErrors<IFormData>;
  watch: UseFormWatch<IFormData>;
  removeQuestion: () => void;
}

export const QuestionFields = ({
  questionIndex,
  removeQuestion,
  control,
  setValue,
  register,
  setError,
  clearErrors,
  errors,
  watch,
}: QuestionProps) => {
  const containerRef = useRef<HTMLInputElement | null>(null);
  const {
    fields: answerFields,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
    rules: { required: 'Нельзя создавать вопросы без ответов.' },
  });

  const handleAddAnswer = () => {
    appendAnswer(
      {
        text: '',
        image: null,
        isCorrect: false,
      },
      { shouldFocus: false },
    );
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, []);

  const questionErrors = errors?.questions?.[questionIndex];

  return (
    <FieldGroup
      ref={containerRef}
      id={`quiz-question-${questionIndex}`}
      className='bg-[rgba(255,255,255,0.03)] p-[var(--default-padding)] rounded-[0.85rem]'
    >
      <FieldLegend className='flex items-center justify-between'>
        <p className='w-full'>Вопрос № {questionIndex + 1}</p>
        <div className='w-fit'>
          <Button size='sm' onClick={removeQuestion} after={<Trash2 className='w-4' />}>
            Удалить
          </Button>
        </div>
      </FieldLegend>
      <Field>
        <FieldLabel htmlFor={`question-text-${questionIndex}`}>Текст вопроса</FieldLabel>
        <Input
          id={`question-text-${questionIndex}`}
          placeholder={'Введите вопрос...'}
          {...register(`questions.${questionIndex}.text`, validationRules.questionTitle)}
        />
        {questionErrors?.text?.message ? (
          <FieldError>{questionErrors?.text?.message}</FieldError>
        ) : (
          <FieldDescription>Минимум 7 символов</FieldDescription>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor={`question-text-${questionIndex}`}>Картинка вопроса</FieldLabel>

        <UploadImage
          id={`question-image-${questionIndex}`}
          type='question'
          clearError={() => clearErrors(`questions.${questionIndex}.image`)}
          setError={(message) => setError(`questions.${questionIndex}.image`, { message })}
          onChange={(value) => setValue(`questions.${questionIndex}.image`, value)}
        />

        {questionErrors?.image?.message ? (
          <FieldError>{questionErrors?.image?.message}</FieldError>
        ) : (
          <FieldDescription>Минимум 7 символов</FieldDescription>
        )}
      </Field>

      {!!answerFields.length && (
        <>
          <FieldSeparator />
          <AnswerFields
            answers={answerFields}
            removeAnswer={removeAnswer}
            register={register}
            setValue={setValue}
            watch={watch}
            questionIndex={questionIndex}
            errors={(questionErrors?.options as any) || []}
          />
        </>
      )}

      <Field>
        <Button type='button' style='white' onClick={handleAddAnswer} after={<ListCheck />}>
          Добавить ответ
        </Button>
      </Field>

      {questionErrors?.options?.root?.message && (
        <FieldError className='text-center'>{questionErrors?.options?.root?.message}</FieldError>
      )}
    </FieldGroup>
  );
};
