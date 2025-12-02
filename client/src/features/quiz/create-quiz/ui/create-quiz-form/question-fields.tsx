import { useEffect, useRef } from "react";
import { ListCheck, Trash2 } from "lucide-react";
import {
  FieldDescription,
  FieldSeparator,
  FieldLegend,
  FieldGroup,
  FieldLabel,
  FieldError,
  Field
} from "@/shared/shadcn/ui/field";
import { UploadImageField } from "@/features/quiz/create-quiz/ui/upload-image";
import {Input} from "@/shared/shadcn/ui/input";
import {
  useFieldArray,
  type Control,
  type UseFormRegister,
  type FieldErrors,
  type UseFormSetValue,
} from 'react-hook-form';
import type { IFormData } from "@/features/quiz/create-quiz/hooks/useCreateQuizForm";
import { Button } from "@/shared/ui/Button";

interface QuestionProps {
  questionIndex: number;
  control: Control<IFormData>;
  register: UseFormRegister<IFormData>;
  errors: FieldErrors<IFormData>;
  setValue: UseFormSetValue<IFormData>;
  removeQuestion: () => void;
}

export const QuestionFields = ({
  questionIndex,
  removeQuestion,
  control,
  setValue,
  register,
  errors
}: QuestionProps) => {
  const containerRef = useRef<HTMLInputElement | null>(null)
  const {
    fields: answerFields,
    append: appendAnswer,
    remove: removeAnswer
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
    rules: { required: 'Нельзя создавать вопросы без ответов.' }
  });

  const handleAddAnswer = () => {
    appendAnswer({
      text: '',
      image: null,
      isCorrect: false
    }, { shouldFocus: false })
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth', // Делает прокрутку плавной
        block: 'end',     // Выравнивает верхний край элемента по верхнему краю видимой области
        inline: 'nearest',   // (Опционально) Если нужно горизонтальное выравнивание
      });
    }
  }, [])

  const questionErrors = errors?.questions?.[questionIndex]

  console.log(questionErrors)

  return (
    <FieldGroup
      ref={containerRef}
      id={`quiz-question-${questionIndex}`}
      className='bg-[rgba(255,255,255,0.03)] p-[var(--default-padding)] rounded-[0.85rem]'
    >
      <FieldLegend className='flex items-center justify-between'>
        <p className='w-full'>Вопрос № {questionIndex + 1}</p>
        <div className='w-fit'>
          <Button
            size='sm'
            onClick={removeQuestion}
            after={<Trash2 className="w-4" />}
          >
            Удалить
          </Button>
        </div>
      </FieldLegend>
      <Field>
        <FieldLabel htmlFor={`question-text-${questionIndex}`}>
          Текст вопроса
        </FieldLabel>
        <Input
          id={`question-text-${questionIndex}`}
          placeholder={"Введите вопрос..."}
          {
          ...register(
            `questions.${questionIndex}.text`,
            {
              required: 'Обязательное поле',
              min: 'Минимальное кол-во символов 7',
              max: 'Максимальное кол-во символов 100',
              minLength: 7,
              maxLength: 100,
            })}
        />
        {questionErrors?.text?.message ? (
          <FieldError>
            {questionErrors?.text?.message}
          </FieldError>
        ) : (
          <FieldDescription>
            Минимум 7 символов
          </FieldDescription>
        )}
      </Field>

      <UploadImageField
        id={`question-image-${questionIndex}`}
        label='Картинка вопроса'
        type='question'
        onChange={value => {
          setValue(`questions.${questionIndex}.image`, value)
        }}
        description='Максимум 1мб, файл PNG, JPG, JPEG'
      />

      {!!answerFields.length && (
        <>
          <FieldSeparator />

          {answerFields.map((answer, index) => {
            const answerErrors = questionErrors?.options?.[index]

            return (
              <Field
                key={answer.id}
                className='relative'
              >
                <FieldLabel htmlFor={`answer-text-${index}`}>
                  Ответ {index + 1}
                </FieldLabel>
                <div className='flex items-center gap-[1rem]'>
                  <Input
                    id={`answer-text-${index}`}
                    placeholder={"Введите ответ..."}
                    {
                      ...register(
                        `questions.${questionIndex}.options.${index}.text`,
                        {
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
                  <FieldError>
                    {answerErrors?.text?.message}
                  </FieldError>
                ) : (
                  <FieldDescription>
                    Минимум 1 символ
                  </FieldDescription>
                )}
              </Field>
            )
          })}
        </>
      )}

      <Field>
        <Button
          type='button'
          style='white'
          onClick={handleAddAnswer}
          after={<ListCheck />}
        >
          Добавить ответ
        </Button>
      </Field>

      {questionErrors?.options?.root?.message && (
        <FieldError className='text-center'>
          {questionErrors?.options?.root?.message}
        </FieldError>
      )}
    </FieldGroup>
  )
}
