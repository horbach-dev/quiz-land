import { useTranslation } from "react-i18next";
import { BadgePlus, FilePlusCorner } from "lucide-react";
import { type Control, useFieldArray } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldSeparator,
  FieldLegend,
} from "@/shared/shadcn/ui/field";
import { Input } from "@/shared/shadcn/ui/input";
import { Textarea } from '@/shared/shadcn/ui/textarea';
import { Button } from "@/shared/ui/Button";
import {type IFormData, useCreateQuizForm} from "@/features/quiz/create-quiz/hooks/useCreateQuizForm";
import { UploadImageField } from "@/features/quiz/create-quiz/ui/upload-image";
import {QuestionFields} from "./question-fields";
import styles from './create-quiz-form.module.css'
import {createPortal} from "react-dom";

const portalContainer = document.getElementById("footer")!;

export const CreateQuizForm = () => {
  const { t } = useTranslation();
  const {
    control,
    onSubmit,
    register,
    setValue,
    clearErrors,
    errors,
    isLoading,
  } = useCreateQuizForm()

  const { fields, append, remove } = useFieldArray({ control, name: 'questions', rules: { required: 'Нельзя создавать квизы без вопросов' } });

  const handleAddQuestion = () => {
    append({
      text: '',
      image: null,
      options: [],
      type: 'TEXT_ANSWER',
      order: fields?.length || 0,
    })
  }

  console.log(fields)

  const isDisabled = !!Object.keys(errors).length

  console.log(errors)

  return (
    <div className="w-full max-w-md">
      <form onSubmit={onSubmit}>
        <FieldSet className='mb-5'>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="quiz-title">
                {t('create_page.form.title')}
              </FieldLabel>
              <Input
                id="quiz-title"
                placeholder={t('create_page.form.title_placeholder')}
                {...register('title', { required: 'Обязательное поле', minLength: 7, maxLength: 30 })}
              />
              {errors.title?.message ? (
                <FieldError>
                  {errors.title.message}
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
                {...register('description', { required: 'Обязательное поле', minLength: 10, maxLength: 1000 })}
              />
              {errors.description?.message ? (
                <FieldError>
                  {errors.description?.message}
                </FieldError>
              ) : (
                <FieldDescription>
                  Минимум 100 символов, максимум 10000
                </FieldDescription>
              )}
            </Field>

            <UploadImageField
              id='quiz-poster'
              type='poster'
              label='Постер квиза (главное изображение)'
              onChange={value => {
                setValue('poster', value)
                clearErrors('poster')
              }}
              error={errors.poster?.message}
              description='Максимум 1мб, разрешен файл PNG, JPG, JPEG'
            />

            <FieldSeparator />

          </FieldGroup>
        </FieldSet>

        <FieldSet className='mb-5'>
          <FieldLegend>
            Вопросы к квизу
          </FieldLegend>
          <FieldDescription>
            {t('create_page.description')}
          </FieldDescription>

          {fields.map((field, index) => (
            <QuestionFields
              key={field.id}
              removeQuestion={() => remove(index)}
              questionIndex={index}
              setValue={setValue}
              control={control as Control<IFormData>}
              register={register}
              errors={errors}
            />
          ))}

          {errors.questions?.root?.message && (
            <FieldError>
              {errors.questions?.root?.message}
            </FieldError>
          )}

          <Button
            loading={isLoading}
            type='button'
            // style='white'
            onClick={handleAddQuestion}
            after={<FilePlusCorner />}
          >
            Добавить вопрос
          </Button>
        </FieldSet>

        {createPortal(
          <div className={styles.footer}>
            <Button
              loading={isLoading}
              disabled={isDisabled}
              type='submit'
              onClick={onSubmit}
              after={<BadgePlus />}
            >
              Создать квиз
            </Button>
          </div>,
          portalContainer
        )}
      </form>
    </div>
  )
}
