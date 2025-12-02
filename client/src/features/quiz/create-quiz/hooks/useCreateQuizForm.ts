import { useForm } from "react-hook-form";
import { useCreateQuizMutation } from "@/features/quiz/create-quiz/hooks/useCreateQuizMutation";

export interface IFormData {
  title: string
  description: string
  poster: string | null
  questions: [
    {
      text: string,
      image: string | null,
      order: number,
      type: 'SINGLE_CHOICE' | 'MULTI_CHOICE' | 'TEXT_ANSWER'
      options: []
    }
  ]
}

// const errorsMap = {
//   required: 'Обязательное поле',
//   minLength: 'Минимальное кол-во символов: {value}',
//   maxLength: 'Максимальное кол-во символов: {value}',
// }
//
// const validationRules = {
//   poster: { required: true },
//   title: { required: true, minLength: 7, maxLength: 30 },
//   description: { required: true, minLength: 100, maxLength: 300 },
// } as const;

// const buildErrors = (errors: FieldErrors<IFormData>): { [key in keyof IFormData]?: string } => {
//   const result = {}
//
//   for (const field in errors) {
//     const value = validationRules[field][errors[field].type]
//     const template = errorsMap[errors[field].type]
//     result[field] = template.replace('{value}', value)
//   }
//
//   return result
// }

export const useCreateQuizForm = () => {
  const { isPending, isSuccess, mutate } = useCreateQuizMutation()

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IFormData>()

  const onSubmit = (data) => {
    if (!data.poster) {
      setError('poster', { type: 'required', message: 'Обязательно к заполнению' })
      return
    }

    mutate({ ...data, limitedByTime: false })
  }

  return {
    control,
    setValue,
    clearErrors,
    isSuccess,
    isLoading: isPending,
    register,
    // register: (name: keyof IFormData) => register(name, validationRules[name]),
    onSubmit: handleSubmit(onSubmit),
    // errors: buildErrors(errors),
    errors,
  }
}
