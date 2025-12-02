import { useTranslation } from "react-i18next";
import { BadgePlus } from "lucide-react";
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

export const CreateQuizForm = () => {
  const { t } = useTranslation();
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
              {t('create_page.description')}
            </FieldDescription>
            <FieldGroup>

              <Field>
                <FieldLabel htmlFor="quiz-title">
                  {t('create_page.form.title')}
                </FieldLabel>
                <Input
                  id="quiz-title"
                  placeholder={t('create_page.form.title_placeholder')}
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
                  {t('create_page.form.description')}
                </FieldLabel>
                <Textarea
                  id="quiz-description"
                  placeholder={t('create_page.form.description_placeholder')}
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
            after={<BadgePlus />}
          >
            Создать квиз
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}
