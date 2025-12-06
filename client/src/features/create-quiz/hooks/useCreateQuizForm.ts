import type { SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';

import { useCreateQuizMutation } from '../hooks/useCreateQuizMutation';
import type { IFormData } from '../types';

export const useCreateQuizForm = () => {
  const { isPending, isSuccess, mutate } = useCreateQuizMutation();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit = (data: IFormData) => {
    mutate({ ...data, limitedByTime: false });
  };

  const preSubmit = (data: SyntheticEvent<HTMLFormElement>) => {
    if (!getValues()?.poster) setError('poster', { message: 'Обязательное поле' });
    return handleSubmit(onSubmit)(data);
  };

  return {
    watch,
    control,
    setValue,
    clearErrors,
    isSuccess,
    isLoading: isPending,
    register,
    onSubmit: preSubmit,
    errors,
    setError,
  };
};
