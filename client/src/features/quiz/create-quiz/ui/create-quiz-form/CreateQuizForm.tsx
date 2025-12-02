import {
  Field,
  FieldDescription, FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/shared/shadcn/ui/field";
import { Input } from "@/shared/shadcn/ui/input";
import { Textarea } from '@/shared/shadcn/ui/textarea';
import { Button } from "@/shared/ui/Button";
import { useCreateQuizForm } from "@/features/quiz/create-quiz/hooks/useCreateQuizForm";
import { UploadImageField } from "@/features/quiz/create-quiz/ui/upload-image";

const description = 'Квиз можно создавать разных типов (один вариант правильный / несколько), ограничивать по времени, добавлять ответы картинками.'

export const CreateQuizForm = () => {
  const {
    onSubmit,
    register,
    setValue,
    clearErrors,
    errors,
    isSuccess,
    isLoading,
  } = useCreateQuizForm()

  const isDisabled = !!Object.keys(errors).length
  console.log(isSuccess)

  return (
    <div className="w-full max-w-md">
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <FieldSet>
            <FieldDescription>
              {description}
            </FieldDescription>
            <FieldGroup>

              <Field>
                <FieldLabel htmlFor="quiz-title">
                  Название квиза
                </FieldLabel>
                <Input
                  id="quiz-title"
                  placeholder='Заголовок...'
                  {...register('title')}
                />
                {errors.title ? (
                  <FieldError>
                    {errors.title}
                  </FieldError>
                ) : (
                  <FieldDescription>
                    Минимум 7 символов
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="quiz-description">
                  Описание квиза
                </FieldLabel>
                <Textarea
                  id="quiz-description"
                  placeholder="Краткое описание..."
                  className="resize-none"
                  {...register('description')}
                />
                {errors.description ? (
                  <FieldError>
                    {errors.description}
                  </FieldError>
                ) : (
                  <FieldDescription>
                    Минимум 100 символов
                  </FieldDescription>
                )}
              </Field>

              <UploadImageField
                id='quiz-poster'
                label='Постер квиза (главное изображение)'
                onChange={value => {
                  setValue('poster', value)
                  clearErrors('poster')
                }}
                error={errors.poster}
                description='Максимум 1мб, разрешены файлы PNG, JPG, JPEG'
              />

            </FieldGroup>
          </FieldSet>
          <Button
            loading={isLoading}
            disabled={isDisabled}
            type='submit'
          >
            Создать квиз
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}
