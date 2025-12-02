import { useForm } from "react-hook-form";
import { useCreateQuizMutation } from "@/features/quiz/create-quiz/hooks/useCreateQuizMutation";

export type IFormDataAnswer = {
  text: string,
  image: string | null,
  isCorrect: boolean,
}

export type IFormDataQuestion = {
  text: string,
  image: string | null,
  order: number,
  type: 'SINGLE_CHOICE' | 'MULTI_CHOICE' | 'TEXT_ANSWER'
  options: IFormDataAnswer[]
}

export interface IFormData {
  title: string
  description: string
  poster: string | null
  questions: IFormDataQuestion[]
}

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
    onSubmit: handleSubmit(onSubmit),
    errors,
  }
}
